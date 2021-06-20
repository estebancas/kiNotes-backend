import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FirestoreService } from '../../core/services';
import { User } from '../auth/user.interface';

@Injectable()
export class UserService extends FirestoreService {
  constructor() {
    super('/users');
  }

  public async getUserById(sub: string): Promise<User> {
    try {
      const userRef = this.collection;
      const snapshot = await userRef.where('sub', '==', sub).get();
      let result = {};

      if (snapshot.empty) {
        throw new NotFoundException('Usuario no encontrado');
      }

      snapshot.forEach((doc) => (result = doc.data()));
      delete (result as User).password;

      return result as User;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getUser(username: string): Promise<User> {
    try {
      const userRef = this.collection.doc(username);
      const result = await userRef.get();

      if (!result.exists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return result.data() as User;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async userExist(username: string): Promise<boolean> {
    const userRef = this.collection.doc(username);
    const result = await userRef.get();

    return result.exists;
  }

  public async updateUserToken(username: string, token: string): Promise<void> {
    try {
      const userRef = this.collection.doc(username);
      const result = await userRef.get();

      if (!result.exists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      await userRef.update({ access_token: token });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
