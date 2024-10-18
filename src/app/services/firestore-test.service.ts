import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTestService {

  constructor(private firestore: AngularFirestore) {}

  // Probar agregar datos
  addTestData() {
    const testData = { name: 'Prueba', createdAt: new Date() };
    return this.firestore.collection('testCollection').add(testData);
  }

  // Probar obtener datos
  getTestData() {
    return this.firestore.collection('testCollection').valueChanges();
  }
}
