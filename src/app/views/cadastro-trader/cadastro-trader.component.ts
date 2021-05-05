import { SnackbarService } from './../../shared/services/snackbar.service';
import { TraderService } from './../../shared/services/trader.service';
import { ValidadorFormularioMensagem } from './../../shared/utils/validador-formulario-mensagem';
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
  selector: 'app-cadastro-trader',
  templateUrl: './cadastro-trader.component.html',
  styleUrls: ['./cadastro-trader.component.scss'],
  providers: [TraderService],
})
export class CadastroTraderComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private traderService: TraderService,
    private snckbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.email,
        ],
      ],
      senha: [
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

  public mensagemEmailOuCpfInvalido(label: string): string {
    return ValidadorFormularioMensagem.mensagemEmailOuCpfInvalido(label);
  }

  public realizarCadastro(): void {
    if (this.formGroup.valid) {
      this.traderService
        .realizarCadastro(this.formGroup.value)
        .subscribe((response) => {
          this.formGroup.reset();
          this.snckbarService.abrirMensagemSucesso(
            'Cadastro realizado com sucesso!',
            5000
          );
        });
    }
  }
}
