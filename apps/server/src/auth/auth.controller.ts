import { Controller, Post, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-session')
  createSession(@Res() res: Response) {
    const { sessionId, cookieOptions } = this.authService.createSession();
    res.cookie('sessionId', sessionId, cookieOptions as CookieOptions);

    res.send({ success: true, sessionId });
  }
}
