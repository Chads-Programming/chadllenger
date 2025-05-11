import { CommandHandler } from "@nestjs/cqrs";
import { ICommandHandler } from "@nestjs/cqrs";
import { GenerateChallengeCommand } from "../impl/generate-challenge.command";
import { OpenaiService } from "@/ai/services/openai.service";
import { generatedQuizChallengeSchema, IGeneratedQuizChallenge } from "@repo/schemas";

@CommandHandler(GenerateChallengeCommand)
export class GenerateChallengeHandler implements ICommandHandler<GenerateChallengeCommand, string> {

    constructor(
        private readonly openaiService: OpenaiService,
    ) { }

    async execute(command: GenerateChallengeCommand): Promise<IGeneratedQuizChallenge> {
        const res = await this.openaiService.generateObject({
            prompt: 'Generate a programming quiz challenge with 5 questions',
            schema: generatedQuizChallengeSchema,
        });

        return res;
    }
}