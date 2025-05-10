import { ChallengeType, Difficult, IQuestChallenge } from '@repo/schemas';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@repo/database';

type FindCodeChallengeParams = { difficult?: Difficult };

@Injectable()
export class QuestChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    difficult,
  }: FindCodeChallengeParams): Promise<IQuestChallenge[]> {
    const params: Prisma.QuestChallengeFindManyArgs = {};

    params.where.deletedAt = null;

    if (difficult) {
      params.where.difficult = difficult;
    }

    return this.prisma.questChallenge.findMany(params);
  }

  async getRandomChallengesByDifficult(
    type: ChallengeType,
    difficulties: Difficult[],
    limit: number,
  ): Promise<IQuestChallenge[]> {
    return await this.prisma.$queryRaw`
      SELECT * FROM "QuestChallenge"
      WHERE "deletedAt" IS NULL
      AND "difficult" = ANY (${Prisma.sql`ARRAY[${Prisma.join(difficulties.map((d) => Prisma.sql`${d}`))}]::"Difficult"[]`})
      AND "type" = ${type}
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;
  }

  findByCodename(codename: string) {
    return this.prisma.questChallenge.findFirstOrThrow({
      where: {
        codename,
        deletedAt: null,
      },
    });
  }
}
