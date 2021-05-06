import { SnackbarService } from './../../shared/services/snackbar.service';
import { TraderService } from 'src/app/shared/services/trader.service';
import { TraderModelPagination } from './../../shared/models/trader-model-pagination';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.scss'],
})
export class TradersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'saldo',
    'isAdmin',
    'acoes',
  ];
  dataSource: TraderModelPagination;
  pageEvent: PageEvent = new PageEvent();
  formGroupEmail: FormGroup;
  formGroupTipo: FormGroup;
  formGroupNome: FormGroup;

  constructor(
    private traderService: TraderService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pageEvent.pageSize = 10;
    this.pageEvent.pageIndex = 0;

    this.buscarTodos(this.pageEvent.pageIndex, this.pageEvent.pageSize);

    this.formGroupTipo = this.formBuilder.group({
      tipo: ['nome'],
    });

    this.formGroupEmail = this.formBuilder.group({
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

    this.formGroupNome = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  public buscarTodos(pagina: number, tamanho: number): void {
    this.traderService
      .buscarTodosPorPaginacao(
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize
      )
      .subscribe((data) => {
        this.dataSource = data;
      });
  }

  openDialog(): void {}

  onPaginateChange(event) {
    this.buscarTodos(this.pageEvent.pageIndex, this.pageEvent.pageSize);
  }

  public darPermissaoDeAdmin(id: number, nome: string): void {
    this.traderService.darPermissaoDeAdmin(id).subscribe((data) => {
      this.snackbarService.abrirMensagemSucesso(
        `Permissão de admin concedida ao trader '${nome}'`,
        5000
      );
      this.buscarTodos(this.pageEvent.pageIndex, this.pageEvent.pageSize);
    });
  }

  public tirarPermissaoDeAdmin(id: number, nome: string): void {
    this.traderService.tirarPermissaoDeAdmin(id).subscribe((data) => {
      this.snackbarService.abrirMensagemSucesso(
        `Permissão de admin retirada do trader '${nome}'`,
        5000
      );
      this.buscarTodos(this.pageEvent.pageIndex, this.pageEvent.pageSize);
    });
  }

  public buscarTodosPorPaginacaoParametro(
    pagina: number,
    tamanho: number,
    parametro: string,
    valor: string
  ): void {
    this.traderService
      .buscarTodosPorPaginacaoEParametro(pagina, tamanho, parametro, valor)
      .subscribe((data) => {
        this.dataSource = data;
      });
  }

  public buscarPorNome(): void {
    if (this.formGroupNome.valid) {
      this.buscarTodosPorPaginacaoParametro(
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize,
        'nome',
        this.formGroupNome.get('nome').value
      );
    }
  }

  public buscarPorEmail(): void {
    if (this.formGroupEmail.valid) {
      this.buscarTodosPorPaginacaoParametro(
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize,
        'email',
        this.formGroupEmail.get('email').value
      );
    }
  }
}
