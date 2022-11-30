import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'libros',
    loadChildren: () => import('./libros/libros.module').then(m => m.LibrosModule),
    canLoad: [AuthGuard], /* Usado para prevenir que la app cargue el modulo entero */
    canActivate: [AuthGuard] /* Usado para prevenir que el usuario acceda a ciertas rutas */
  },
  {
    path: '**',
    redirectTo: 'libros'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
