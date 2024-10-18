import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.userSubject.next(user);
      if (user) {
        // Guardar el token en localStorage
        localStorage.setItem('token', user.uid);
      } else {
        // Limpiar el token si no hay usuario
        localStorage.removeItem('token');
      }
    });
  }

  sendLoginLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: environment.loginRedirectUrl + '/confirm-login', // Ruta para confirmar el login
      handleCodeInApp: true,
    };

    return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      });
  }

  async confirmSignIn(url: string): Promise<void> {
    const isSignInWithEmailLink = await this.afAuth.isSignInWithEmailLink(url);
    console.log('Is Sign In with Email Link:', isSignInWithEmailLink);

    if (isSignInWithEmailLink) {
      const email = window.localStorage.getItem('emailForSignIn') || '';
      console.log('Email para inicio de sesión:', email);

      try {
        const userCredential = await this.afAuth.signInWithEmailLink(email, url);
        const user = userCredential.user;
        if (user) {
          // Guardar el token en localStorage
          localStorage.setItem('token', user.uid); 
        }
        window.localStorage.removeItem('emailForSignIn');
        console.log('Inicio de sesión exitoso', user);
        this.userSubject.next(user); // Actualiza el estado del usuario
        this.router.navigate(['/main']); // Redirige al usuario a la página principal
      } catch (error) {
        console.error('Error al confirmar el inicio de sesión:', error);
        Swal.fire('Error', 'No se pudo confirmar el inicio de sesión.', 'error');
        throw error;
      }
    } else {
      console.error('El link no es válido');
      Swal.fire('Error', 'El link no es válido.', 'error');
      throw new Error('El link no es válido');
    }
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('token')
    });
  }
  isLoggedIn(): boolean {
    // Verifica si el usuario tiene un token válido o está autenticado
    return !!localStorage.getItem('token');
  }
  // Devuelve el usuario actual almacenado
  get currentUser(): any {
    return this.userSubject.value; 
  }
}
