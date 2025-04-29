import { PlayerCacheRepository } from './../repositories/player-cache.repository';
import { Status } from '../types/challenge-state';
import { ParticipantModel } from '../models/participant.model';
import { CodeChallengeRepository } from '../../database/repositories/code-challenge.repository';
import { Injectable } from '@nestjs/common';
import { ChallengeCacheRepository } from '../repositories/challenge-cache.repository';
import { CreateChallenge } from '@repo/schemas';
import {
  CreateChallengeRequestType,
  JoinChallengeRequestType,
  JoinChallengeResponseType,
  JoinStatus,
} from '../types/challenge-store';
import { CodeChallengeStateModel } from '../models/code-challenge.model';
import { envs } from '@/config/envs';
import { CustomError } from '@/core/errors/custom-error';

const CODE_CHALLENGES_SIZE = 3;
const CHALLENGE_EXPIRATION_TIME = Math.ceil(Number(envs.CHALLENGE_TTL) / 2);

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly codeChallengeRepository: CodeChallengeRepository,
    private readonly playerCacheRepository: PlayerCacheRepository,
  ) {}

  async createChallenge(creatorId: string, createChallenge: CreateChallenge) {
    try {
      const challenges =
        await this.codeChallengeRepository.getRandomChallengesByDifficult(
          createChallenge.difficulties,
          CODE_CHALLENGES_SIZE,
        );

      const codeChallenges = challenges.map(
        (codeChallenge) => new CodeChallengeStateModel(codeChallenge.id),
      );

      const creatorParticpant = new ParticipantModel(
        creatorId,
        createChallenge.creatorName,
      );

      const challengeStore: CreateChallengeRequestType = {
        title: createChallenge.title,
        creator: creatorId,
        participants: [creatorParticpant],
        codeChallenges,
        status: Status.PENDING,
        expiration: CHALLENGE_EXPIRATION_TIME,
      };

      const challenge =
        await this.challengeRepository.createChallenge(challengeStore);

      await this.playerCacheRepository.setPlayerRoom(
        creatorId,
        challenge.codename,
      );

      return challenge;
    } catch (error) {
      throw CustomError.serverError({
        origin: 'ChallengeService',
        message: 'Error creating challenge',
        data: error,
      });
    }
  }

  getByCodename(codename: string) {
    return this.challengeRepository.findChallengeByCodename(codename);
  }

  async finishChallenge(codename: string) {
    await this.challengeRepository.updateChallenge(codename, {
      status: Status.FINISHED,
    });

    return this.getByCodename(codename);
  }

  async addPartipant(
    joinRequest: JoinChallengeRequestType,
  ): Promise<JoinChallengeResponseType> {
    const challenge = await this.getByCodename(joinRequest.challengeCodename);

    if (!challenge) {
      throw CustomError.notFound({
        origin: 'ChallengeService',
        message: 'Challenge not found',
      });
    }

    if (challenge.status !== Status.PENDING) {
      throw CustomError.badArguments({
        origin: 'ChallengeService',
        message: 'Challenge is not in pending status',
      });
    }

    const existinParticipant = await this.findParticipantById(
      joinRequest.challengeCodename,
      joinRequest.participantId,
    );

    if (existinParticipant) {
      return {
        status: JoinStatus.ALREADY_JOINED,
        participant: existinParticipant,
      };
    }

    const participant = new ParticipantModel(
      joinRequest.participantId,
      joinRequest.participantName,
    );

    await Promise.all([
      this.challengeRepository.updateChallenge(joinRequest.challengeCodename, {
        participants: [...challenge.participants, participant],
      }),
      this.playerCacheRepository.setPlayerRoom(
        joinRequest.participantId,
        challenge.codename,
      ),
    ]);

    return {
      status: JoinStatus.JOINED,
      participant,
    };
  }

  async findParticipantById(
    codename: string,
    id: string,
  ): Promise<ParticipantModel | null> {
    const challenge = await this.getByCodename(codename);

    const participant = challenge.participants.find(
      (participant) => participant.id === id,
    );

    if (!participant) {
      return null;
    }

    return participant;
  }

  findPlayerCurrentRoom(playerId: string) {
    return this.playerCacheRepository.getPlayerRoom(playerId);
  }

  updateParticipantScore() {}
  updateCodeChallenge() {}
}
