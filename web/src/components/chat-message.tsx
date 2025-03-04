"use client"

import "@/styles/markdown.css";
import { Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Message = {
    type: "user" | "ai"
    content: string
}

type ChatMessageProps = {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {

    return (
        <div className={cn("mb-4 flex", message.type === "user" ? "justify-end" : "justify-start")}>
            <div
                className={cn("max-w-[80%] rounded-lg p-4", message.type === "user" ? "bg-secondary" : "bg-background")}
            >
                <div className="flex items-center gap-2 mb-4">
                    {
                        message.type === "user"
                            ? <UserRound className="h-4 w-4" />
                            : <Sparkles className="h-4 w-4" />
                    }
                    <span className="text-sm font-medium">
                        {
                            message.type === "user"
                                ? "You"
                                : "report.ai"
                        }
                    </span>
                </div>
                <div>
                    {
                        message.type === "ai"
                            ? (
                                <div className="markdown-body prose dark:prose-invert">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-sm">{message.content}</p>
                            )
                    }
                </div>
            </div>
        </div>
    )
}