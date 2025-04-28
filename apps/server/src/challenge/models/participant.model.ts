export class ParticipantModel {
  id: string;
  name: string;
  score: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.score = 0;
  }
}
