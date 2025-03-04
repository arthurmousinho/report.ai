import { type FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProductCategory, ProductRating } from "@prisma/client";
import { createProduct } from "../services/products-service";

export function createProductRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/products',
            {
                schema: {
                    body: z.object({
                        name: z.string().trim(),
                        price: z.number(),
                        sales: z.number(),
                        description: z.string().trim(),
                        category: z.union([
                            z.literal(ProductCategory.CARS),
                            z.literal(ProductCategory.CLOTHES),
                            z.literal(ProductCategory.FOOD),
                            z.literal(ProductCategory.HOUSE),
                            z.literal(ProductCategory.SPORTS),
                            z.literal(ProductCategory.TECNOLOGY)
                        ]),
                        rating: z.union([
                            z.literal(ProductRating.ONE),
                            z.literal(ProductRating.TWO),
                            z.literal(ProductRating.THREE),
                            z.literal(ProductRating.FOUR),
                            z.literal(ProductRating.FIVE)
                        ])
                    })
                },
            },
            async (request, reply) => {
                const { name, price, description, category, rating, sales } = request.body;

                await createProduct({
                    name,
                    price,
                    description,
                    sales,
                    category,
                    rating
                })

                return reply.status(201).send();
            }
        )
}