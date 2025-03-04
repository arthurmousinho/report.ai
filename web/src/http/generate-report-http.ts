import { api } from "@/lib/api-client";

type Request = {
    prompt: string;
}
type Response = {
    response: string;
};

export async function generateReport(data: Request): Promise<Response> {
    const result = await api.post(
        'ai/generate-report', 
        { 
            json: data, 
            timeout: 120000
        },
    ).json<Response>();

    return result;
}