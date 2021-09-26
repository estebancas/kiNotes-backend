import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.service.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Contraseña o email son incorrectos');
    }

    return user;
  }
}
