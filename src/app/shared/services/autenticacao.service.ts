import { TraderAutenticado } from './../models/trader-autenticado';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor() {}

  public isAutenticado(): boolean {
    return localStorage.getItem('trader-autenticado') !== null &&
      localStorage.getItem('trader-autenticado') !== undefined &&
      localStorage.getItem('trader-autenticado') !== ''
      ? true
      : false;
  }

  public getTraderAutenticado(): TraderAutenticado {
    let dado = JSON.parse(localStorage.getItem('trader-autenticado'));

    let traderAutenticado: TraderAutenticado = new TraderAutenticado(
      dado.id,
      dado.token,
      eval(dado.isAdmin)
    );

    return traderAutenticado;
  }

  public isAdmin(): boolean {
    return this.getTraderAutenticado().isAdmin === true;
  }
}
