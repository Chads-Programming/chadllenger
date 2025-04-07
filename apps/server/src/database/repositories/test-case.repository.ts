import { TestCaseModel } from '@repo/schemas';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestCaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByCodeChallenge(challengeId: string): Promise<TestCaseModel[]> {
    return this.prisma.testCase.findMany({
      where: { deletedAt: null, codeChallengeId: challengeId },
    });
  }
}
