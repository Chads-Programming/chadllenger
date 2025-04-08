import { CodeChallengeModel, Difficult } from '@repo/schemas';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@repo/database/generated/client';

type FindCodeChallengeParams = { difficult?: Difficult };

@Injectable()
export class CodeChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    difficult,
  }: FindCodeChallengeParams): Promise<CodeChallengeModel[]> {
    const params: Prisma.CodeChallengeFindManyArgs = {};

    params.where.deletedAt = null;

    if (difficult) {
      params.where.difficult = difficult;
    }

    return this.prisma.codeChallenge.findMany(params);
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
