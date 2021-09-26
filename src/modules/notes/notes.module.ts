import { Module } from '@nestjs/common';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
