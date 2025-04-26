import { Injectable } from '@nestjs/common';
import { generateUniqueId } from '@/utils/unique-id';

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
      sessionId: generateUniqueId(),
      cookieOptions: options,
    };
  }
}
