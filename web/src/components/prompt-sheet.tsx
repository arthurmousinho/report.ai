import type React from "react"

import { useState, useTransition, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { WandIcon, SendIcon, Loader, Sparkles } from "lucide-react"
import { z } from "zod"
import { generateReport } from "@/http/generate-report-http"
import { FormError } from "./form-error"
import { ChatMessage, type Message } from "./chat-message"

const promptSchema = z.object({
    prompt: z.string().min(1, { message: "Prompt is required" }),
})

type PromptFormData = z.infer<typeof promptSchema>

export function PromptSheet() {

    const [isPending, startTransition] = useTransition()
    const [messages, setMessages] = useState<Message[]>([])

    const responseRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = useForm<PromptFormData>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            prompt: "",
        },
    })

    const promptValue = watch("prompt")

    useEffect(() => {
        const scrollToTopOfNextMessage = () => {
            if (responseRef.current) {
                const lastMessage = responseRef.current.lastElementChild
                if (lastMessage) {
                    lastMessage.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }
        }
        scrollToTopOfNextMessage()
    }, [messages])

    const onSubmit = async (data: PromptFormData) => {
        reset();

        const userMessage: Message = {
            type: "user",
            content: data.prompt,
        }

        setMessages((prev) => [...prev, userMessage])

        startTransition(async () => {
            try {
                const result = await generateReport({
                    prompt: data.prompt,
                })
                const aiMessage: Message = { type: "ai", content: result.response }
                setMessages((prev) => [...prev, aiMessage])
                reset({ prompt: "" })
            } catch (error) {
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "ai",
                        content: "Sorry, I encountered an error. Please try again.",
                    },
                ])
            }
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (promptValue?.trim() && !isSubmitting && !isPending) {
                formRef.current?.requestSubmit()
            }
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <WandIcon size={18} />
                    Ask AI
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-0 pt-10 w-full sm:max-w-xl">
                <SheetHeader className="sr-only">
                    <SheetTitle>AI Assistant</SheetTitle>
                </SheetHeader>
                <main ref={responseRef} className="flex-1 overflow-y-auto px-6 py-4">
                    {messages.length === 0 && (
                        <header className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                            <Sparkles size={40} className="mb-4 text-primary/40" />
                            <h3 className="text-lg font-medium mb-2">
                                How can I help you today?
                            </h3>
                            <p className="text-sm">
                                Try asking "What are the best rated products?"
                            </p>
                        </header>
                    )}

                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </main>

                <footer className="border-t bg-background p-4">
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="relative">
                            <Textarea
                                placeholder="Ask a question..."
                                className="min-h-[80px] pr-16 resize-none"
                                onKeyDown={handleKeyDown}
                                {...register("prompt")}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="absolute bottom-2 right-2"
                                disabled={isSubmitting || !promptValue?.trim() || isPending}
                            >
                                {
                                    isPending
                                        ? <Loader size={18} className="animate-spin" />
                                        : <SendIcon size={18} />
                                }
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>

                        {errors.prompt && <FormError message={errors.prompt.message} />}
                    </form>
                </footer>
            </SheetContent>
        </Sheet>
    )
}