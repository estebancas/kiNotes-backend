import { Module } from '@nestjs/common';
import * as fromServices from './services';

const SERVICES = [fromServices.FirestoreService];

@Module({
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class CoreModule {}
