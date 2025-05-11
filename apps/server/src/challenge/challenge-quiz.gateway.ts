import { envs } from '@/config/envs';
import { WsCustomExceptionFilter } from '@/exception-filters/ws-custom-exception-filter';
import { UseFilters } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

@UseFilters(WsCustomExceptionFilter)
@WebSocketGateway({
  namespace: 'challenge',
  transports: ['websocket'],
  cors: {
    origin: envs.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})
export class ChallengeQuizGateway {}
