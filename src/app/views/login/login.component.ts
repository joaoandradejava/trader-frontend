import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { TraderAutenticado } from './../../shared/models/trader-autenticado';
import { LoginService } from './../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
      senha: [
        '',
        [Validators.required, Validators.minLength(0), Validators.maxLength],
      ],
    });
  }

  public realizarLogin(): void {
    if (this.formGroup.valid) {
      this.loginService
        .realizarLogin(this.formGroup.value)
        .subscribe((response) => {
          this.formGroup.reset();
          let traderAutenticado: TraderAutenticado = response;
          localStorage.setItem(
            'trader-autenticado',
            JSON.stringify(traderAutenticado)
          );
          this.router.navigate(['home']);
        });
    }
  }

  public openDialogEsqueceuSenha(): void {
    this.dialog.open(EsqueceuSenhaComponent);
  }
}
