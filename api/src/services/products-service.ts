import type { ProductCategory, ProductRating } from "@prisma/client";
import { prismaSingleton } from "../lib/prisma";

type CreateProductParams = {
    name: string;
    price: number;
    sales: number;
    description: string;
    category: ProductCategory;
    rating: ProductRating;
}

export async function createProduct(params: CreateProductParams) {
    const { name, price, description, category, rating, sales } = params;

    await prismaSingleton.product.create({
        data: {
            name,
            price,
            sales,
            description,
            category,
            rating
        }
    })
}

export async function getProducts() {
    return await prismaSingleton.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}