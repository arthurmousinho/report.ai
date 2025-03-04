import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";
import { createProductRoute } from "./routes/create-product-route";
import { getProductsRoute } from "./routes/get-products-route";
import { generateReportRoute } from "./routes/generate-report-route";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: ['http://localhost:3000']
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createProductRoute);
app.register(getProductsRoute);
app.register(generateReportRoute);

app.listen({ port: Number(process.env.PORT) || 3333 }).then(() => {
    console.log('HTTP Server Running!')
});