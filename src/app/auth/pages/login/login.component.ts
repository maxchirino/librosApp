import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl: string = environment.baseURL;
  resp: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  miFormulario: FormGroup = this.fb.group({
    email: [, Validators.required],
    password: [, Validators.required]
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

    let url: string = `${this.baseUrl}/cuentas/login`;
    this.http.post(url, this.miFormulario.value).subscribe(resp => {
      this.resp = resp;
      console.log(this.resp);
    });

    this.miFormulario.reset();
  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched;
  }

}
