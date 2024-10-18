import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  // Mostrar el componente con la gif del loader
  show() {
    this.isLoadingSubject.next(true);
  }
  // Esconder el componente
  hide() {
    this.isLoadingSubject.next(false);
  }
}
