import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: string = '';

  submenuBuscarLibro: MenuItem[] = [
    {
      texto: 'Por título',
      ruta: './libro-por-titulo'
    },
    {
      texto: 'Por autor',
      ruta: './libro-por-autor'
    }
  ]

  submenuBuscarAutor: MenuItem[] = [
    {
      texto: 'Por nombre',
      ruta: './autor-por-nombre'
    },
    {
      texto: 'Por apellido',
      ruta: './autor-por-apellido'
    },
    {
      texto: 'Por nombre o apellido',
      ruta: './autor-por-nombre-o-apellido'
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.authService.getDatosUsuario(token).subscribe(datos => {
        this.usuario = datos.email.substring(0, datos.email.indexOf('@')); /* Me quedo con lo que está antes del @ */
      })
    }
  }

  logout() {
    this.authService.logout(); /* Reseteo el auth (token y expiracion) */
    this.router.navigate(['./auth']);
  }

}
