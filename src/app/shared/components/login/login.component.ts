import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoaderService } from '../../../services/loader.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService // Inyectar el loader
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validaciones
    });
  }
  // Metodo de login
  sendLoginLink() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;

      this.loaderService.show(); // Mostrar el loader al iniciar la petición

      this.authService.sendLoginLink(email)
        .then(() => {
          this.loaderService.hide(); // Ocultar el loader tras éxito
          Swal.fire({
            icon: 'success',
            title: '¡Enlace enviado!',
            text: 'Se ha enviado un enlace de login a tu correo electrónico.',
          });
        })
        .catch((error) => {
          this.loaderService.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar el enlace. Inténtalo de nuevo.',
          });
          console.error('Error al enviar el enlace', error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
    }
  }
}
