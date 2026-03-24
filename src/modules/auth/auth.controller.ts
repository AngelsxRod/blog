import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInAuthDto: SignInAuthDto, @Res() res: Response) {
    const token = await this.authService.singIn(signInAuthDto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // ⚠️ true en producción (HTTPS)
      sameSite: 'lax',
      maxAge: 24000 * 60 * 60, // 24 horas en milisegundos
    });

    return res.json({
      message: 'Login exitoso',
    });
  }
}
