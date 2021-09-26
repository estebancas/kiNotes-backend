import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../user/user.service';
import { Reminder } from './reminders.interface';

@Injectable()
export class RemindersService {
  constructor(private userService: UserService) {}

  public async addReminder(sub: string, reminder: Reminder) {
    const updatedReminder: Reminder = {
      ...reminder,
      createtAt: new Date().getTime(),
      id: uuidv4(),
    };

    return this.userService.updateUserReminders(sub, updatedReminder);
  }

  public async getUserReminders(sub: string) {
    const user = await this.userService.getUser(sub);

    return user.reminders;
  }
}
