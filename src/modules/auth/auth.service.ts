import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.interface';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../core/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (await comparePassword(password, user.password)) {
      return user;
    }

    return null;
  }

  public async signToken(user: User): Promise<User> {
    const payload = { username: user.username, sub: user.sub };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  public async login(user: User): Promise<User> {
    try {
      const updatedUser = await this.signToken(user);

      await this.userService.updateUserToken(
        user.username,
        updatedUser.access_token,
      );
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
