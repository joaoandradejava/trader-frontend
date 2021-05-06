import { TraderModelResumo } from './../../shared/models/trader-model-resumo';
import { TraderService } from 'src/app/shared/services/trader.service';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  traderModelResumo: TraderModelResumo;

  constructor(
    private traderService: TraderService,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.traderService
      .buscarPorIdResumido(this.autenticacaoService.getTraderAutenticado().id)
      .subscribe((data) => {
        this.traderModelResumo = data;
      });
  }
}
