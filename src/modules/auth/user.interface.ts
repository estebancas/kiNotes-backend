import { Note } from '../notes/notes.interface';

export interface User {
  sub: string;
  access_token?: string;
  name: string;
  username?: string;
  email: string;
  nutshell?: string;
  password?: string;
  img?: string;
  notes?: Note[] | []; // TODO: should be Todos type
  reminders?: []; // TODO: should be Reminders type
}
