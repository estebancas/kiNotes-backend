import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CoreModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
