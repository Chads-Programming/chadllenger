import { envs } from "@/config/envs";
import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import { Injectable } from "@nestjs/common";
import { generateObject, generateText, LanguageModelV1 } from 'ai';
import { z } from "zod";

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAIProvider;
    private readonly openaiModel: LanguageModelV1;

    constructor() {
        this.openai = createOpenAI({ apiKey: envs.OPENAI_API_KEY });
        this.openaiModel = this.openai.chat(envs.OPENAI_MODEL);
    }

    async generateObject<T>({ prompt, schema }: { prompt: string, schema: z.ZodSchema<T> }) {
        const res = await generateObject<T>({
            model: this.openaiModel,
            schema,
            prompt,
        });
        
        return res.object;
    }

    async generateText({ prompt }: { prompt: string }) {
        return await generateText({
            model: this.openaiModel,
            prompt,
        });
    }
}
