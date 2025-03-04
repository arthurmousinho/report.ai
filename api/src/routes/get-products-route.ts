import { type FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getProducts } from "../services/products-service";

export function getProductsRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/products',
            async (_, reply) => {
                const products = await getProducts();
                return reply.status(200).send({
                    products
                });
            }
        )
}