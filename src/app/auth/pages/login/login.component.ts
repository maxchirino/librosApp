import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl: string = environment.baseURL;
  resp: any;
  loginIncorrecto: boolean = false;

  /* Getter para obtener el auth que viene del servicio */
  // get auth() {
  //   return this.authService.auth;
  // }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  miFormulario: FormGroup = this.fb.group({
    email:    [, [Validators.required, Validators.minLength(6), Validators.email]],
    password: [, [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  login() {
    /*
      Si quiero mostrar los errores cuando el usuario presione Guardar sin haber ingresado nada (y sin haber tocado los campos) uso markAllAsTouched que marcará todos los campos como tocados, y hará que la función campoNoEsValido sea true.
    */
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.authService.login(this.miFormulario.value).subscribe({
      next: (resp) => {
        /* La respuesta contiene el token y la expiracion (tipo Auth) */
        this.resp = resp;
        this.loginIncorrecto = false;
        this.router.navigate(['./libros']);
      },
      error: () => {
        this.loginIncorrecto = true;
      }
    })

    this.miFormulario.reset();
  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

}
