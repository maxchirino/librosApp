import { Component, Input, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-libro-animado',
  templateUrl: './libro-animado.component.html',
  styleUrls: ['./libro-animado.component.css']
})
export class LibroAnimadoComponent implements OnInit {

  @Input() libroHijo!: Libro; 

  constructor() { }

  ngOnInit(): void {
  }

}
