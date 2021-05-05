import { TraderModelPagination } from './../../shared/models/trader-model-pagination';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.scss'],
})
export class TradersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'saldo', 'isAdmin'];
  dataSource: TraderModelPagination;

  constructor() {}

  ngOnInit(): void {

  }
  openDialog(): void {}

  openDialogEdit(id): void {}

  deletarPorId(id, nome): void {}

  onPaginateChange(event) {}
}
