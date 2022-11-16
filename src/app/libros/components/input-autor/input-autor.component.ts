import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-autor',
  templateUrl: './input-autor.component.html',
  styleUrls: ['./input-autor.component.css']
})
export class InputAutorComponent  {

  @Input() buscar!: () => void;
  @Input() termino!: string;
  @Input() name!: string;

}
