import type { CreateProductData } from "@/@types/create-product-data.type";
import { api } from "@/lib/api-client";

type Response = void;

export async function createProduct(data: CreateProductData): Promise<Response> {
    const result = await api.post(
        'products', { json: data }
    ).json<Response>();

    return result;
}