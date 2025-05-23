import { Difficult, ICodeChallenge } from '@repo/schemas';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@repo/database';

type FindCodeChallengeParams = { difficult?: Difficult };

@Injectable()
export class CodeChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    difficult,
  }: FindCodeChallengeParams): Promise<ICodeChallenge[]> {
    const params: Prisma.CodeChallengeFindManyArgs = {};

    params.where.deletedAt = null;

    if (difficult) {
      params.where.difficult = difficult;
    }

    return this.prisma.codeChallenge.findMany(params);
  }

  async getRandomChallengesByDifficult(
    difficulties: Difficult[],
    limit: number,
  ): Promise<ICodeChallenge[]> {
    return await this.prisma.$queryRaw`
      SELECT * FROM "CodeChallenge"
      WHERE "deletedAt" IS NULL
      AND "difficult" = ANY (${Prisma.sql`ARRAY[${Prisma.join(difficulties.map((d) => Prisma.sql`${d}`))}]::"Difficult"[]`})
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;
  }

  findByCodename(codename: string) {
    return this.prisma.codeChallenge.findFirstOrThrow({
      where: {
        codename,
        deletedAt: null,
      },
    });
  }
}
