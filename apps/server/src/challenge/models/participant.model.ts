export class ParticipantModel {
  id: string;
  name: string;
  points: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.points = 0;
  }
}
