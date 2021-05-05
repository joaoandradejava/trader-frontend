import { AcaoModelPagination } from './../../../shared/models/acao-model-pagination';
import { SnackbarService } from './../../../shared/services/snackbar.service';
import { AcoesCreateAndUpdateComponent } from './../acoes-create-and-update/acoes-create-and-update.component';
import { AcaoService } from './../../../shared/services/acao.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-acoes-admin',
  templateUrl: './acoes-admin.component.html',
  styleUrls: ['./acoes-admin.component.scss'],
})
export class AcoesAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'preco', 'acoes'];
  dataSource: AcaoModelPagination;
  pageEvent: PageEvent = new PageEvent();

  tamanhoPagina: number = 5;

  constructor(
    private acaoService: AcaoService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = this.tamanhoPagina;
    this.buscarTodosPorPaginacao(0, this.pageEvent.pageSize);

    //this.buscarTodos();
  }

  buscarTodos(): void {
    this.acaoService.buscarTodas().subscribe((response) => {
      this.dataSource = response;
    });
  }

  buscarTodosPorPaginacao(pagina: number, tamanho: number): void {
    this.acaoService
      .buscarTodasPorPaginacao(pagina, tamanho)
      .subscribe((data) => {
        this.dataSource = data;
      });
  }

  isTemAcao(): boolean {
    return this.dataSource.content.length <= 0 ? false : true;
  }

  public openDialog(): void {
    const dialog = this.dialog.open(AcoesCreateAndUpdateComponent, {
      data: { id: undefined },
    });

    dialog
      .afterClosed()
      .subscribe((data) =>
        this.buscarTodosPorPaginacao(
          this.pageEvent.pageIndex,
          this.pageEvent.pageSize
        )
      );
  }

  public openDialogEdit(id): void {
    const dialog = this.dialog.open(AcoesCreateAndUpdateComponent, {
      data: { id: id },
    });

    dialog
      .afterClosed()
      .subscribe((data) =>
        this.buscarTodosPorPaginacao(
          this.pageEvent.pageIndex,
          this.pageEvent.pageSize
        )
      );
  }

  public deletarPorId(id: any, nome: string): void {
    if (confirm(`Realmente deseja deletar a ação '${nome}'?`)) {
      this.acaoService.deletarPorId(id).subscribe((data) => {
        this.buscarTodosPorPaginacao(
          this.pageEvent.pageIndex,
          this.pageEvent.pageSize
        );
        this.snackbarService.abrirMensagemSucesso(
          `Açãa '${nome}' deletada com sucesso!`,
          5000
        );
      });
    }
  }

  onPaginateChange(event: PageEvent) {
    this.buscarTodosPorPaginacao(event.pageIndex, event.pageSize);
  }
}
