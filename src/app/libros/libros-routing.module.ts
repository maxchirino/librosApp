import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoComponent } from './pages/listado/listado.component';
import { LibroComponent } from './pages/libro/libro.component';
import { PorTituloComponent } from './pages/por-titulo/por-titulo.component';
import { PorAutorComponent } from './pages/por-autor/por-autor.component';
import { AutorComponent } from './pages/autor/autor.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { AutorPorNombreComponent } from './pages/autor-por-nombre/autor-por-nombre.component';
import { AutorPorApellidoComponent } from './pages/autor-por-apellido/autor-por-apellido.component';
import { AutorPorNombreOApellidoComponent } from './pages/autor-por-nombre-o-apellido/autor-por-nombre-o-apellido.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'libro/:id', component: LibroComponent },
      { path: 'autor/:id', component: AutorComponent },
      { path: 'libro-por-titulo', component: PorTituloComponent },
      { path: 'libro-por-autor', component: PorAutorComponent },
      { path: 'autores', component: AutoresComponent},
      { path: 'autor-por-nombre', component: AutorPorNombreComponent},
      { path: 'autor-por-apellido', component: AutorPorApellidoComponent },
      { path: 'autor-por-nombre-o-apellido', component: AutorPorNombreOApellidoComponent},
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
