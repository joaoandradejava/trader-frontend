import { SnackbarService } from './../../../shared/services/snackbar.service';
import { ValidadorFormularioMensagem } from './../../../shared/utils/validador-formulario-mensagem';
import { ErrorStateMatcher } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { TraderService } from 'src/app/shared/services/trader.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.scss'],
})
export class EsqueceuSenhaComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private traderService: TraderService,
    private dialogRef: MatDialogRef<EsqueceuSenhaComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.email,
        ],
      ],
    });
  }

  public mensagemCampoObrigatorio(label: string): string {
    return ValidadorFormularioMensagem.mensagemCampoObrigatorio(label);
  }

  public mensagemCampoTamanhoCaracteres(
    label: string,
    min: number,
    max: number
  ): string {
    return ValidadorFormularioMensagem.mensagemCampoTamanhoCaracteres(
      label,
      min,
      max
    );
  }
  public mensagemEmailOuCpfInvalido(label: string): string {
    return ValidadorFormularioMensagem.mensagemEmailOuCpfInvalido(label);
  }

  public enviarSenha(): void {
    if (this.formGroup.valid) {
      this.traderService
        .recuperarSenha(this.formGroup.value)
        .subscribe((data) => {
          this.dialogRef.close();
          this.formGroup.reset();
          this.snackbarService.abrirMensagemSucesso(
            'Uma nova senha de acesso ao sistema foi enviada para o seu email',
            6000
          );
        });
    }
  }
}
