import { SnackbarService } from './../../../shared/services/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ValidadorFormularioMensagem } from './../../../shared/utils/validador-formulario-mensagem';
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
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

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
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private traderService: TraderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      senhaAtual: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
      novaSenha: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
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

  public alterarSenha(): void {
    this.traderService.alterarSenha(this.formGroup.value).subscribe((data) => {
      this.formGroup.reset();
      this.snackbarService.abrirMensagemSucesso(
        'Senha alterada com sucesso!',
        5000
      );
    });
  }
}
