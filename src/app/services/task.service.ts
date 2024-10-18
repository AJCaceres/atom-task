import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private tasksCollection: AngularFirestoreCollection<Task>; // Colección tipada con Task
  tasks: Observable<Task[]>; // Observable para los datos de la colección

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.tasksCollection = firestore.collection<Task>('tasks');
    this.tasks = this.tasksCollection.valueChanges({ idField: 'id' });
  }

  // Método para agregar una nueva tarea
  addTask(task: Task): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único
    return this.firestore.collection('tasks').doc(id).set({
      ...task,
      id // Guarda el id en la tarea
    });
  }

  // Método para obtener todas las tareas del usuario 
  getTasksByUser(userId: string): Observable<Task[]> {
    return this.firestore.collection<Task>('tasks', ref => 
      ref.where('userId', '==', userId)
         .orderBy('createdDate')) 
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id; // Obtén el id del documento
          return { ...data, id }; // Combina los datos con el id
        });
      })
    );
  }

  // Método para actualizar una tarea
  updateTask(id: string, task: Partial<Task>) {
    return this.tasksCollection.doc(id).update(task);
  }

  // Método para eliminar una tarea
  deleteTask(id: string) {
    console.log("task a eliminar", id);
    
    return this.tasksCollection.doc(id).delete();
  }
}
