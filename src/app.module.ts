import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { UserModule } from './modules/user/user.module';
import { CoreModule } from './core/core.module';

import * as fromModules from './modules';

dotenv.config();

const MODULES = [
  fromModules.AuthModule,
  fromModules.ContentModule,
  fromModules.UserModule,
];

@Module({
  imports: [...MODULES, UserModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
