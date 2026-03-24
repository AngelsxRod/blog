/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.access_token || null; // 👈 cookie aquí
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('security.jwtSecret'),
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}

interface JwtPayload {
  sub: string;
  email: string;
}
