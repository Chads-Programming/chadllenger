export class CodeChallengeStateModel {
  id: string;
  startedAt?: Date;
  winner?: string;

  constructor(id: string) {
    this.id = id;
  }
}
