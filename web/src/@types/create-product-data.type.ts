import type { ProductCategoryData } from "./product-category.type";
import type { ProductRateData } from "./product-rate-type";

export type CreateProductData = {
    name: string;
    description: string;
    price: number;
    sales: number;
    category: ProductCategoryData;
    rating: ProductRateData;
}