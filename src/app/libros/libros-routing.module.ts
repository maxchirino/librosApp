import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoComponent } from './pages/listado/listado.component';
import { LibroComponent } from './pages/libro/libro.component';
import { PorTituloComponent } from './pages/por-titulo/por-titulo.component';
import { PorAutorComponent } from './pages/por-autor/por-autor.component';
import { AutorComponent } from './pages/autor/autor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'libro/:id', component: LibroComponent },
      { path: 'autor/:id', component: AutorComponent },
      { path: 'por-titulo', component: PorTituloComponent },
      { path: 'por-autor', component: PorAutorComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
