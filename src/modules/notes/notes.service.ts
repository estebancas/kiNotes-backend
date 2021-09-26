import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../user/user.service';
import { Note } from './notes.interface';

@Injectable()
export class NotesService {
  constructor(private userService: UserService) {}

  public async addNote(sub: string, note: Note) {
    const updatedNote: Note = {
      ...note,
      createtAt: new Date().getTime(),
      id: uuidv4(),
    };

    return this.userService.updateUserNotes(sub, updatedNote);
  }

  public async getUserNotes(sub: string) {
    const user = await this.userService.getUser(sub);

    return user.notes;
  }
}
