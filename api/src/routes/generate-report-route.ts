import { type FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { generateReport } from "../services/ai-service";

export function generateReportRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/ai/generate-report',
            {
                schema: {
                    body: z.object({
                        prompt: z.string().trim()
                    })
                },
            },
            async (request, reply) => {
                const { prompt } = request.body;

                const response = await generateReport({
                    prompt
                });

                return reply.status(200).send(response);
            }
        )
}