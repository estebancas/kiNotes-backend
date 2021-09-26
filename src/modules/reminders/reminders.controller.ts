import { Controller, Put, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';

import { RemindersService } from './reminders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserContext } from '../auth/decorators/userContext';
import { User } from '../auth/user.interface';
import { Reminder } from './reminders.interface';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly service: RemindersService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async addUserReminder(@UserContext() user: User, @Req() request: Request) {
    const data = request.body as Reminder;
    return this.service.addReminder(user.sub, data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserReminders(@UserContext() user: User) {
    return this.service.getUserReminders(user.sub);
  }
}
