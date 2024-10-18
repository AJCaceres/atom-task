import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../task-form/task-form/task-form.component';

import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  standalone: true,
  imports: [TaskFormComponent, CommonModule, HeaderComponent, MatIconModule, MatButtonModule],
  styleUrls: ['./list-task.component.scss'],
  // providers: [TaskService]
})
export class ListTaskComponent implements OnInit {

  tasks:Task[]=[]
  tasks$: Observable<Task[]>;
  taskToEdit?:Task
  showForm = false;

  constructor(
    private authService: AuthService, 
    private taskService: TaskService
  ){
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit() {

    const userId = this.authService.currentUser?.uid;
    if (userId) {
      // se inicia el componente y si existe el formulario se traen las tareas de este
      this.tasks$ = this.taskService.getTasksByUser(userId);
    } else {
      this.tasks$ = new Observable<Task[]>();
    }
    
  }
  // Metodo de ocultar el formulario
  onFormClose() {
    this.showForm = false;
  }
  // Metodo de eliminar la tarea
  onDelete(task:Task){
    console.log("Tarea a eliminar: ", task);
    this.taskService.deleteTask(task.id)
    .then(() => {
      console.log('Tarea eliminada:', task);
      Swal.fire({
        icon: 'success',
        title: 'Tarea eliminada!',
        text: 'La tarea ha sido eliminada con éxito.',
      });
    })
    .catch(error => {
      console.error('Error al eliminar la tarea:', error);
    });
  }
  // Metodo de edicion de una tarea
  onEdit(task: Task) {
    console.log("tarea seleccionada: ", task);
    this.taskToEdit = task;
    this.showForm = true; // Mostrar el formulario
  }
  // Metodo de creacion de tarea
  onCreate() {
    this.taskToEdit = undefined; // No hay tarea a editar
    this.showForm = true;
  }
  // Metodo de carga de tareas del usuario 
  loadTasks() {
    const userId = this.authService.currentUser?.uid; // Obtener el ID del usuario actual
    if (userId) {
      this.tasks$ = this.taskService.getTasksByUser(userId);
      this.tasks$.subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }

}
