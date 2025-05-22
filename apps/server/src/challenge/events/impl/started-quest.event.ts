export class StartedQuestEvent {
  constructor(
    public readonly codename: string,
    public readonly questId: string,
  ) {}
}
