import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss'],
  standalone: true,
})
export class ConfirmLoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const url = window.location.href;
    this.confirmSignIn(url);
  }
  // Confirmacion de inicio de sesion
  async confirmSignIn(url: string) {
    try {
      await this.authService.confirmSignIn(url);
      Swal.fire('Éxito', 'Inicio de sesión confirmado!', 'success');
    } catch (error) {
      Swal.fire('Error', "Error en confirmación de inicio de sesión", 'error');
    }
  }
}
