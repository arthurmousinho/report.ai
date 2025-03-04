import { z } from "zod";
import { openaiSingleton } from "../lib/openai";
import { generateText, tool } from "ai";
import { prismaSingleton } from "../lib/prisma";

const GenerateReportParamsSchema = z.object({
    prompt: z.string().min(1, "O prompt não pode estar vazio."),
});

type GenerateReportParams = z.infer<typeof GenerateReportParamsSchema>;

const SYSTEM_PROMPT = `
    You are an AI assistant responsible for answering questions and generate reports about a set of product data. 
    Include only what the user asked for in the response, without any additional text. 
    The response should always be in markdown (without including \`\`\` at the beginning or end).
`.trim();

const POSTGRESQL_TOOL = tool({
    description: `
        Performs a query in postgreSQL to retrieve information about database tables.
        
        Only SELECT operations are allowed; any write operations are forbidden.
        
        Tables:
        """
        CREATE TYPE "ProductCategory" AS ENUM ('TECNOLOGY', 'CLOTHES', 'FOOD', 'HOUSE', 'CARS', 'SPORTS');

        CREATE TYPE "ProductRating" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

        CREATE TABLE "product" (
            "id" SERIAL PRIMARY KEY,
            "name" TEXT NOT NULL,
            "description" TEXT,
            "price" DOUBLE PRECISION NOT NULL,
            "sales" INTEGER NOT NULL DEFAULT 0,
            "category" "ProductCategory" NOT NULL,
            "rating" "ProductRating" NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """

        All queries must return a maximum of 50 items.
    `.trim(),
    parameters: z.object({
        query: z.string().describe("The SQL query to be executed"),
        params: z.array(z.string()).describe("The parameters for the SQL query"),
    }),
    execute: async ({ query, params }) => {
        const result = await prismaSingleton.$queryRawUnsafe(query, ...params);

        const serializedResult = JSON.parse(
            JSON.stringify(result, (_, value) => (typeof value === "bigint" ? Number(value) : value))
        );

        return JSON.stringify(serializedResult);
    },
});

export async function generateReport(params: GenerateReportParams) {
    GenerateReportParamsSchema.parse(params);

    const response = await generateText({
        model: openaiSingleton,
        prompt: params.prompt,
        system: SYSTEM_PROMPT,
        tools: { postgresql: POSTGRESQL_TOOL },
        maxSteps: 5,
    });

    return { response: response.text };
}