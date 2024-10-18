import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
},
{
    path: "main",
    loadComponent: () => import("./shared/components/list-task/list-task/list-task.component")
      .then((m) => m.ListTaskComponent),
    canActivate: [AuthGuard], // Protege esta ruta con el guard
},
{
    path: "confirm-login",
    loadComponent: () => import("./shared/components/confirm-login/confirm-login.component").then((m) => m.ConfirmLoginComponent)

},
{
    path: "login",
    loadComponent: () => import("./shared/components/login/login.component").then((m) => m.LoginComponent),
}, 
{
    path: "**",
    redirectTo: "/login",
    pathMatch: "full"
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
