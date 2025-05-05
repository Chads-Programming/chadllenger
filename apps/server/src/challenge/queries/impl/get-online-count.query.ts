import { Query } from '@nestjs/cqrs';

export class GetOnlineCountQuery extends Query<number> {}
