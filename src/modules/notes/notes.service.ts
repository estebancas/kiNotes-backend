import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../user/user.service';
import { Note } from './notes.interface';

@Injectable()
export class NotesService {
  constructor(private userService: UserService) {}

  public async pushNote(sub: string, note: Note) {
    const updatedNote: Note = {
      ...note,
      createdAt: new Date().getTime(),
      id: uuidv4(),
    };

    return this.userService.pushUserNote(sub, updatedNote);
  }

  public async getUserNotes(sub: string) {
    const user = await this.userService.getUser(sub);

    return user.notes;
  }

  public async deleteUserNote(sub: string, noteId: string) {
    return this.userService.deleteUserNote(sub, noteId);
  }

  public async updateUserNote(sub: string, noteId: string, body: Note) {
    return this.userService.updateUserNote(sub, noteId, body);
  }
}
