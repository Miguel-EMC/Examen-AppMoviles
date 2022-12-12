import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  createData(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getData(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }
  deleteData(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  updateData(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  getId() {
    return this.database.createId();
  }
}
