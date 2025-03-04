"use client"

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { CategoryBadge } from "./category-badge";
import { Rating } from "./ui/rating";
import { Card } from "./ui/card";
import { createProduct } from "@/http/create-product-http";
import { toast } from "sonner";
import { FormError } from "./form-error";


const productSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" }),
    price: z
        .coerce
        .number()
        .positive({ message: "Price must be positive" }),
    sales: z
        .coerce
        .number()
        .positive({ message: "Sales must be positive" }),
    description: z
        .string()
        .min(1, { message: "Description is required" }),
    category: z
        .enum(
            ["TECNOLOGY", "CLOTHES", "FOOD", "HOUSE", "CARS", "SPORTS"],
            { message: "Category is required" },
        ),
    rating: z
        .enum(
            ["ONE", "TWO", "THREE", "FOUR", "FIVE"],
            { message: "Rating is required" },
        ),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function CreateProductDialog() {

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: undefined,
            description: "",
            category: undefined,
            rating: "ONE",
            sales: undefined
        },
    });

    async function onSubmit(data: ProductFormValues) {
        startTransition(async () => {
            try {
                await createProduct(data)
                reset()
                toast('Product created successfully!')
            } catch (error) {
                toast('Error on product creation!')
                console.log(error)
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon size={20} />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleSubmit(onSubmit)} name="create-product-form">
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Input
                                    id="name"
                                    placeholder="Enter the product name"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <FormError message={errors.name.message} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price USD
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter the product price"
                                    {...register("price")}
                                />
                                {errors.price && (
                                    <FormError message={errors.price.message} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Sales
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Input
                                    id="sales"
                                    type="number"
                                    step="1"
                                    min="0"
                                    placeholder="Enter the product sales"
                                    {...register("sales")}
                                />
                                {errors.price && (
                                    <FormError message={errors.sales?.message} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Textarea
                                    id="description"
                                    placeholder="Enter the product description"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <FormError message={errors.description.message} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select the category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="TECNOLOGY">
                                                    <CategoryBadge category="TECNOLOGY" />
                                                </SelectItem>
                                                <SelectItem value="CLOTHES">
                                                    <CategoryBadge category="CLOTHES" />
                                                </SelectItem>
                                                <SelectItem value="FOOD">
                                                    <CategoryBadge category="FOOD" />
                                                </SelectItem>
                                                <SelectItem value="HOUSE">
                                                    <CategoryBadge category="HOUSE" />
                                                </SelectItem>
                                                <SelectItem value="CARS">
                                                    <CategoryBadge category="CARS" />
                                                </SelectItem>
                                                <SelectItem value="SPORTS">
                                                    <CategoryBadge category="SPORTS" />
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && (
                                    <FormError message={errors.category.message} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">
                                Rating
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <Card className="px-3 py-1 rounded-md shadow-xs">
                                    <Controller
                                        name="rating"
                                        control={control}
                                        render={({ field }) => <Rating value={field.value} onChange={field.onChange} variant="input" />}
                                    />
                                </Card>
                                {errors.rating && (
                                    <FormError message={errors.rating.message} />
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent >
        </Dialog >
    )
}