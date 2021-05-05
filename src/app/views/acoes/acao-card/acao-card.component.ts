import { SnackbarService } from './../../../shared/services/snackbar.service';
import { TraderService } from './../../../shared/services/trader.service';
import { AcaoModel } from './../../../shared/models/acao-model';
import { ValidadorFormularioMensagem } from './../../../shared/utils/validador-formulario-mensagem';
import { ErrorStateMatcher } from '@angular/material/core';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
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
  selector: 'app-acao-card',
  templateUrl: './acao-card.component.html',
  styleUrls: ['./acao-card.component.scss'],
  providers: [TraderService],
})
export class AcaoCardComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  @Input() acaoModel: AcaoModel;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private traderService: TraderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: this.acaoModel.id,
      quantidade: [0, [Validators.required, Validators.min(1.0)]],
    });
  }

  public mensagemCampoObrigatorio(label: string): string {
    return ValidadorFormularioMensagem.mensagemCampoObrigatorio(label);
  }

  public mensagemValorMinimo(label: string, valorMinimo: number): string {
    return ValidadorFormularioMensagem.mensagemValorMinimo(label, valorMinimo);
  }

  public comprar(): void {
    if (this.formGroup.valid) {
      this.traderService
        .comprarAcao(
          this.autenticacaoService.getTraderAutenticado().id,
          this.formGroup.value
        )
        .subscribe((data) => {
          this.formGroup.reset();
          this.snackbarService.abrirMensagemSucesso(
            'Compra da Ação realizada com sucesso!',
            5000
          );
        });
    }
  }
}
