import type { ProductData } from "@/@types/product-data.type"
import { api } from "@/lib/api-client"

export async function getProducts() {
    const result = await api
        .get('products')
        .json<{ products: ProductData[] }>()

    return result
}