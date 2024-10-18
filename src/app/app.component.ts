import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Obtener las tareas cuando se inicia el componente
    // this.taskService.getTasks().subscribe(data => {
    //   this.tasks = data;
    //   console.log('Tareas obtenidas:', this.tasks);
    // });
  }

  // Método para agregar una tarea de prueba
  // addTask() {
  //   const hoy = new Date
  //   const newTask: Task = {
  //     title: 'Nueva tarea',
  //     description: 'Descripción de la tarea',
  //     status: "pending",
  //     userId:"12365s4dfd",
  //     createdDate:firebase.firestore.Timestamp.now()
  //   };
  //   this.taskService.addTask(newTask)
  //     .then(() => console.log('Tarea agregada'))
  //     .catch((error) => console.error('Error al agregar tarea:', error));
  // }

  // // Método para eliminar una tarea por ID
  // deleteTask(id: string) {
  //   this.taskService.deleteTask(id)
  //     .then(() => console.log('Tarea eliminada'))
  //     .catch((error) => console.error('Error al eliminar tarea:', error));
  // }
}
