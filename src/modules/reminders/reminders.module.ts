import { Module } from '@nestjs/common';

import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [RemindersService],
  controllers: [RemindersController],
  exports: [RemindersService],
})
export class RemindersModule {}
