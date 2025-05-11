import { AI_QUEUE } from "@/challenge/consts";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { CommandBus, EventBus } from "@nestjs/cqrs";
import { Job } from "bullmq";
import { GenerateChallengeCommand } from "../commands/impl/generate-challenge.command";
import { GeneratedChallengeEvent } from "../events/impl/generated-challenge.event";

@Processor(AI_QUEUE.NAME)
export class AIConsumer extends WorkerHost {
    constructor(private readonly commandBus: CommandBus, private readonly eventBus: EventBus
    ) {
        super()
    }

    async process(job: Job<string, void, string>): Promise<void> {
        if (job.name === AI_QUEUE.JOBS.GENERATE_CHALLENGE) {
            return this.processGenerateChallenge(job);
        }
    }

    private async processGenerateChallenge(job: Job<string, void, string>): Promise<void> {
        const challengeId = job.data;
        const res = await this.commandBus.execute(new GenerateChallengeCommand(challengeId));
        await this.eventBus.publish(new GeneratedChallengeEvent({ ...res, id: challengeId }));
        
    }
}