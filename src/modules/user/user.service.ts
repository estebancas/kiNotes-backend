import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FirestoreService } from '../../core/services';
import { User } from '../auth/user.interface';
import { Note } from '../notes/notes.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService extends FirestoreService {
  constructor() {
    super('/users');
  }

  /**
   * Careful with this one as returns password
   * @param username
   * @returns Raw User: including password!
   */
  public async getUserAndPasswordByUsername(username: string): Promise<User> {
    try {
      const userRef = this.collection;
      const snapshot = await userRef.where('username', '==', username).get();
      let result = {};

      if (snapshot.empty) {
        throw new NotFoundException('Usuario no encontrado');
      }

      snapshot.forEach((doc) => (result = doc.data()));

      return result as User;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getUser(sub: string): Promise<User> {
    try {
      const userRef = this.collection.doc(sub);
      const result = await userRef.get();

      if (!result.exists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const response = result.data() as User;
      delete response.password;

      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async userExist(username: string): Promise<boolean> {
    const userRef = this.collection;
    const snapshot = await userRef.where('username', '==', username).get();

    if (snapshot.empty) {
      return false;
    }

    return true;
  }

  public async updateUserToken(sub: string, token: string): Promise<void> {
    try {
      const userRef = this.collection.doc(sub);
      const result = await userRef.get();

      if (!result.exists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      await userRef.update({ access_token: token });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async createUser(user: User): Promise<User> {
    try {
      if (await this.userExist(user.username)) {
        throw new BadRequestException('Ya existe un usuario con ese email!');
      }

      await this.collection.doc(user.sub).set(user);

      const response = user;
      delete response.password;
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async pushUserNote(sub: string, note: Note): Promise<Note> {
    try {
      const userRef = this.collection.doc(sub);

      await userRef.update({
        notes: admin.firestore.FieldValue.arrayUnion(note),
      });

      return note;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateUserReminders(sub: string, note: Note) {
    try {
      const userRef = this.collection.doc(sub);

      await userRef.update({
        reminders: admin.firestore.FieldValue.arrayUnion(note),
      });

      return note;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async deleteUserNote(sub: string, noteId: string): Promise<boolean> {
    try {
      const userRef = this.collection.doc(sub);
      const user = await userRef.get();
      const { notes } = user.data();

      await userRef.update({
        notes: (notes as Note[]).filter((note) => note.id !== noteId),
      });

      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateUserNote(
    sub: string,
    noteId: string,
    body: Note,
  ): Promise<Note> {
    try {
      const userRef = this.collection.doc(sub);
      const user = await userRef.get();
      const { notes } = user.data();
      let response = {};

      await userRef.update({
        notes: (notes as Note[]).map((note) => {
          if (note.id === noteId) {
            const updatedNote = { ...note, ...body, id: noteId };
            note = updatedNote;
            response = updatedNote;
          }

          return note;
        }),
      });

      return response as Note;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
