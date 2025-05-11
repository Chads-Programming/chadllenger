import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { IChallengeState } from '@repo/schemas';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { ErrorCodes } from '@/lib/errors';
import { CustomError } from '@/core/errors/custom-error';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.handler';
import { UpdateQuizzChallengeRequestType } from '@/challenge/types/challenge-store';

@CommandHandler(UpdateQuizzChallengeCommand)
export class UpdateQuizzChallengeHandler
    implements ICommandHandler<UpdateQuizzChallengeCommand, IChallengeState> {
    constructor(
        private readonly challengeRepository: ChallengeCacheRepository,
        private readonly queryBus: QueryBus,
    ) { }

    async execute(
        command: UpdateQuizzChallengeCommand,
    ): Promise<UpdateQuizzChallengeRequestType> {
        const challenge = await this.queryBus.execute(
            new GetChallengeQuery(command.data.codename),
        );

        if (!challenge) {
            throw CustomError.notFound({
                origin: 'JoinChallengeHandler',
                code: ErrorCodes.CHALLENGE_NOT_FOUND,
                message: 'Challenge not found',
            });
        }

        if (challenge.status !== Status.PENDING) {
            throw CustomError.badArguments({
                origin: 'JoinChallengeHandler',
                code: ErrorCodes.CHALLENGE_IS_NOT_PENDING,
                message: 'Challenge is not in pending status',
            });
        }


        const res = await this.challengeRepository.updateChallenge(
            command.data.codename,
            {
                type:"Quiz",
                challenges: []
            },
        )


        this.logger.log('Participant added', 'JoinChallengeHandler::execute', {
            participant,
        });

        return {
            status: JoinStatus.JOINED,
            participant,
        };
    }
}
