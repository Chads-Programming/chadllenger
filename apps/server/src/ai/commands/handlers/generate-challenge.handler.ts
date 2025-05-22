import { CommandHandler } from '@nestjs/cqrs';
import { ICommandHandler } from '@nestjs/cqrs';
import { GenerateChallengeCommand } from '../impl/generate-challenge.command';
import { OpenaiService } from '@/ai/services/openai.service';
import { IGeneratedQuizChallenge } from '@repo/schemas';

const mockGeneratedChallenge: IGeneratedQuizChallenge = {
  title: 'Quiz Challenge',
  description: 'This is a quiz challenge',
  questions: [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: [
        {
          id: '1',
          text: 'Paris',
          isCorrectAnswer: true,
        },
        {
          id: '2',
          text: 'London',
          isCorrectAnswer: false,
        },
      ],
    },
  ],
};

@CommandHandler(GenerateChallengeCommand)
export class GenerateChallengeHandler
  implements ICommandHandler<GenerateChallengeCommand, string>
{
  constructor(private readonly openaiService: OpenaiService) {}

  async execute(
    command: GenerateChallengeCommand,
  ): Promise<IGeneratedQuizChallenge> {
    /* const res = await this.openaiService.generateObject({
            prompt: 'Generate a programming quiz challenge with 5 questions',
            schema: generatedQuizChallengeSchema,
        });

        return res; */
    return mockGeneratedChallenge;
  }
}
