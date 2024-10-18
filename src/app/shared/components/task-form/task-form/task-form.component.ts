import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de que este import sea correcto
import { TaskService } from 'src/app/services/task.service'; // Asegúrate de que este import sea correcto
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit?: Task; // Tarea a editar
  @Output() closeForm = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending'], // Valor por defecto
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit); // Actualiza el formulario con los nuevos valores
      console.log('Tarea a editar:', this.taskToEdit);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
        id: this.taskToEdit?.id,
        createdDate: new Date(), // Establecer la fecha de creación como la fecha actual
        userId: this.authService.currentUser?.uid || '',
      };

      // Emitir evento para agregar o actualizar la tarea
      this.taskToEdit ? this.updateTask(taskData) : this.createTask(taskData);
    }
  }
  // Metodo de creacion de tarea
  private createTask(task: Task) {
    this.taskService.addTask(task)
      .then(() => {
        console.log('Tarea Creada:', task);
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada!',
          text: 'Se ha creado con éxito la tarea.',
        });
        this.closeForm.emit(); // Emitir el evento para cerrar el formulario
      })
      .catch(error => {
        console.error('Error al crear la tarea:', error);
      });
  }

  private updateTask(task: Task) {
    console.log("update ", task);
    this.taskService.updateTask(task.id, task)
      .then(() => {
        console.log('Tarea actualizada:', task);
        Swal.fire({
          icon: 'success',
          title: 'Tarea actualizada!',
          text: 'Se ha actualizado con éxito la tarea.',
        });
        this.closeForm.emit(); // Emitir el evento para cerrar el formulario
      })
      .catch(error => {
        console.error('Error al actualizar la tarea:', error);
    });
  }

  onCancel() {
    this.closeForm.emit(); // Emitir el evento al hacer clic en cancelar
  }
}
