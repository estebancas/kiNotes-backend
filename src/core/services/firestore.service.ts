import * as admin from 'firebase-admin';

export class FirestoreService {
  protected firestore: admin.firestore.Firestore;
  protected collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(document: string) {
    this.firestore = new admin.firestore.Firestore();

    if (document) {
      this.collection = this.firestore.collection(document);
    }
  }
}
