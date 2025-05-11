import { WithId } from "@/types/with-id.type";
import { IGeneratedQuizChallenge } from "@repo/schemas";


export class GeneratedChallengeEvent {
  constructor(public readonly challenge: WithId<IGeneratedQuizChallenge>) { }
}
