import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
import { ValidatorsService } from '../../services/validators.service';
import { DatosUsuario } from '../../interfaces/datosUsuario.interface';
import { flatMap, mergeMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginIncorrecto: boolean = false;
  
  constructor(
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  miFormulario: FormGroup = this.fb.group({
    email: [, [Validators.required,
    Validators.minLength(6),
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: [, [Validators.required,
    Validators.minLength(8),
    this.validatorsService.patternValidator(/\d/, { hasNumber: true }),
    this.validatorsService.patternValidator(/[A-Z]/, { hasUppercaseLetter: true }),
    this.validatorsService.patternValidator(/[a-z]/, { hasLowercaseLetter: true }),
    this.validatorsService.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, { hasSpecialCharacter: true })]]
  });

  ngOnInit(): void {
  }

  obs!: Subscription;
  obs2!: Subscription;

  ngOnDestroy(): void {
    // this.obs = this.authService.getDatosUsuario(this.auth).subscribe(datosUsuario => this.datosUsuario = datosUsuario);
    // this.obs.unsubscribe();
    // this.obs2.unsubscribe();
  }

  login() {
    /*
      Si quiero mostrar los errores cuando el usuario presione Guardar sin haber ingresado nada (y sin haber tocado los campos) uso markAllAsTouched que marcará todos los campos como tocados, y hará que la función campoNoEsValido sea true.
    */
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    // this.obs = this.authService.login(this.miFormulario.value).subscribe({
    //   next: (auth: Auth) => {
    //     this.loginIncorrecto = false;
    //     console.log('Iniciando sesión...');
    //     this.obs2 = this.authService.getDatosUsuario(auth).subscribe();
    //     this.router.navigate(['./libros']);
    //   },
    //   error: () => {
    //     this.loginIncorrecto = true;
    //   }
    // });

    // NO FUNCIONA COMO QUIERO
    this.obs = this.authService.login(this.miFormulario.value).pipe(
      mergeMap(auth => this.authService.getDatosUsuario(auth))
    ).subscribe(datos => console.log(datos))

    this.miFormulario.reset();
  }
}
