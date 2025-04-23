import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  createSession() {
    const options = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: true,
    };

    return {
      sessionId: uuidv4(),
      cookieOptions: options,
    };
  }
}
