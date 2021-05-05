import { AcaoService } from './../../shared/services/acao.service';
import { AcaoModel } from './../../shared/models/acao-model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  acoes: Observable<AcaoModel[]>

  constructor(private acaoService: AcaoService) { }

  ngOnInit(): void {
    this.acoes = this.acaoService.buscarTodas()
  }

}
