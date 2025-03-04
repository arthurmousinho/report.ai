import type { ProductCategoryData } from "./product-category.type";
import type { ProductRateData } from "./product-rate-type";

export type ProductData = {
    id: string;
    name: string;
    description: string;
    price: number;
    sales: number;
    category: ProductCategoryData;
    rating: ProductRateData;
    createdAt: string;
}