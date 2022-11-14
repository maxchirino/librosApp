import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosRoutingModule } from './libros-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { LibroComponent } from './pages/libro/libro.component';
import { PorTituloComponent } from './pages/por-titulo/por-titulo.component';
import { PorAutorComponent } from './pages/por-autor/por-autor.component';
import { AutorComponent } from './pages/autor/autor.component';
import { AutoresComponent } from './pages/autores/autores.component';


@NgModule({
  declarations: [
    ListadoComponent,
    LibroComponent,
    PorTituloComponent,
    PorAutorComponent,
    AutorComponent,
    AutoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LibrosRoutingModule
  ]
})
export class LibrosModule { }
