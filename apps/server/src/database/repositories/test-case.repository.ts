import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ITestCase } from '@repo/schemas';

@Injectable()
export class TestCaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByCodeChallenge(challengeId: string): Promise<ITestCase[]> {
    return this.prisma.testCase.findMany({
      where: { deletedAt: null, codeChallengeId: challengeId },
    });
  }
}
