import {
  Controller,
  Put,
  UseGuards,
  Req,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { Request } from 'express';

import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserContext } from '../auth/decorators/userContext';
import { User } from '../auth/user.interface';
import { Note } from './notes.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async pushUserNote(@UserContext() user: User, @Req() request: Request) {
    const data = request.body as Note;
    return this.service.pushNote(user.sub, data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserNotes(@UserContext() user: User) {
    return this.service.getUserNotes(user.sub);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUseNote(@UserContext() user: User, @Param('id') noteId: string) {
    return this.service.deleteUserNote(user.sub, noteId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserNote(
    @UserContext() user: User,
    @Param('id') noteId: string,
    @Req() request: Request,
  ) {
    const data = request.body as Note;
    return this.service.updateUserNote(user.sub, noteId, data);
  }
}
