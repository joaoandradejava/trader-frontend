import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { TraderUpdateInput } from './../../shared/models/trader-update-input';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { ValidadorFormularioMensagem } from './../../shared/utils/validador-formulario-mensagem';
import { ErrorStateMatcher } from '@angular/material/core';
import { TraderModel } from './../../shared/models/trader-model';
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
  selector: 'app-editar-dados',
  templateUrl: './editar-dados.component.html',
  styleUrls: ['./editar-dados.component.scss'],
})
export class EditarDadosComponent implements OnInit {
  formGroup: FormGroup;
  traderModel: TraderModel;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private traderService: TraderService,
    private autenticacaoService: AutenticacaoService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
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
      email: ['', []],
    });

    this.traderService
      .buscarPorId(this.autenticacaoService.getTraderAutenticado().id)
      .subscribe((data) => {
        this.traderModel = data;
        this.formGroup.get('nome').setValue(this.traderModel.nome);
        this.formGroup.get('email').setValue(this.traderModel.email);
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

  atualizar(): void {
    if (this.formGroup.valid) {
      let traderUpdateInput: TraderUpdateInput = new TraderUpdateInput();
      traderUpdateInput.nome = this.formGroup.get('nome').value;
      this.traderService
        .atualizar(this.traderModel.id, traderUpdateInput)
        .subscribe((data) => {
          this.snackbarService.abrirMensagemSucesso(
            'Seus dados foram atualizados!',
            5000
          );
        });
    }
  }

  abrirModalAlterarSenha(): void {
    const dialogRef = this.dialog.open(AlterarSenhaComponent);
  }
}
