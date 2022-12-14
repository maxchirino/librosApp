import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroExitoso: boolean = false;
  registroDuplicado: boolean = false;

  constructor(
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder
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
    this.validatorsService.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, { hasSpecialCharacter: true }),
    ]]
  });

  ngOnInit(): void {
  }

  register() {
    /*
      Si quiero mostrar los errores cuando el usuario presione Guardar sin haber ingresado nada (y sin haber tocado los campos) uso markAllAsTouched que marcará todos los campos como tocados, y hará que la función campoNoEsValido sea true.
    */
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.authService.register(this.miFormulario.value).subscribe({
      next: () => {
        console.log('Registro exitoso');
        this.registroExitoso = true;
        this.registroDuplicado = false;
      },
      error: (err) => {
        this.registroExitoso = false;
        this.registroDuplicado = true;
        console.log('Fallo en el registro');
        console.log(err)
      }
    })
  }

}
