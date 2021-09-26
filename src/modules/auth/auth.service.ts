import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { User } from './user.interface';
import { UserService } from '../user/user.service';
import { comparePassword, encryptPassword } from '../../core/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.getUserAndPasswordByUsername(username);

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
        user.sub,
        updatedUser.access_token,
      );

      delete updatedUser.password;

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async register(user: User): Promise<User> {
    try {
      // username will be same as email for now
      const updatedUser: User = {
        ...user,
        username: user.email,
        sub: uuidv4(),
        password: await encryptPassword(user.password),
        notes: [],
        reminders: [],
      };

      const signedUser = await this.signToken(updatedUser);

      return this.userService.createUser(signedUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
