import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor.interface';

@Component({
  selector: 'app-resultado-autor',
  templateUrl: './resultado-autor.component.html',
  styleUrls: ['./resultado-autor.component.css']
})
export class ResultadoAutorComponent  {

  @Input() autor!: Autor;
}
