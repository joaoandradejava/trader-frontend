import { SnackbarService } from './../../../shared/services/snackbar.service';
import { AcaoService } from './../../../shared/services/acao.service';
import { ValidadorFormularioMensagem } from './../../../shared/utils/validador-formulario-mensagem';
import { ErrorStateMatcher } from '@angular/material/core';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selector: 'app-acoes-create-and-update',
  templateUrl: './acoes-create-and-update.component.html',
  styleUrls: ['./acoes-create-and-update.component.scss'],
})
export class AcoesCreateAndUpdateComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  mensagemCampoSalvarOuAtualizar: string = 'Salvar';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private acaoService: AcaoService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AcoesCreateAndUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      preco: [0.0, [Validators.required, Validators.min(1.0)]],
    });
    if (!this.isSalvar()) {
      this.mensagemCampoSalvarOuAtualizar = 'Atualizar';
      this.acaoService.buscarPorId(this.data.id).subscribe((data) => {
        this.formGroup.get('nome').setValue(data.nome);
        this.formGroup.get('preco').setValue(data.preco);
      });
    }
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

  public mensagemValorMinimo(label: string, valorMinimo: number): string {
    return ValidadorFormularioMensagem.mensagemValorMinimo(label, valorMinimo);
  }

  public limparCampos(): void {
    this.formGroup.reset();
  }

  public salvar(): void {
    if (this.formGroup.valid) {
      if (this.isSalvar()) {
        this.acaoService.salvar(this.formGroup.value).subscribe((data) => {
          this.formGroup.reset();
          this.dialogRef.close();
          this.snackbarService.abrirMensagemSucesso(
            'Ação cadastrada com sucesso!',
            5000
          );
        });
      } else {
        this.acaoService
          .atualizar(this.data.id, this.formGroup.value)
          .subscribe((data) => {
            this.formGroup.reset();
            this.dialogRef.close();
            this.snackbarService.abrirMensagemSucesso(
              'Ação atualizada com sucesso!',
              5000
            );
          });
      }
    }
  }

  isSalvar(): boolean {
    return this.data.id === undefined ? true : false;
  }
}
