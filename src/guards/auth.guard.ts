import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const jwks = createRemoteJWKSet(
        new URL(`${process.env.TOKEN_ISSUER_URL}/.well-known/jwks`),
      );

      await jwtVerify(token, jwks, {
        issuer: process.env.TOKEN_ISSUER_URL,
        audience: process.env.TOKEN_AUDIENCE,
        subject: process.env.TOKEN_SUBJECT,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
