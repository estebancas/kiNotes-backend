import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async getUsers(@Param('id') id: string) {
    return this.service.getUser(id);
  }
}
