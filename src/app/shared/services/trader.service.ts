import { RecuperarSenhaInput } from './../models/recuperar-senha-input';
import { AlterarSenhaInput } from './../models/alterar-senha-input';
import { TraderUpdateInput } from './../models/trader-update-input';
import { ComprarAcaoInput } from './../models/comprar-acao-input';
import { Backend } from './../utils/backend';
import { TraderCreateInput } from './../models/trader-create-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraderService {
  constructor(private http: HttpClient) {}

  public realizarCadastro(
    traderCreateInput: TraderCreateInput
  ): Observable<any> {
    return this.http.post(`${Backend.getBaseTrader}`, traderCreateInput);
  }

  public comprarAcao(
    id: number,
    comprarAcaoInput: ComprarAcaoInput
  ): Observable<any> {
    return this.http.put(
      `${Backend.getBaseTrader}/${id}/acao`,
      comprarAcaoInput
    );
  }

  public buscarPorId(id: any): Observable<any> {
    return this.http.get(`${Backend.getBaseTrader}/${id}`);
  }

  public atualizar(
    id: number,
    traderUpdateInput: TraderUpdateInput
  ): Observable<any> {
    return this.http.put(`${Backend.getBaseTrader}/${id}`, traderUpdateInput);
  }

  public alterarSenha(alterarSenhaInput: AlterarSenhaInput): Observable<any> {
    return this.http.put(`${Backend.getBaseTrader}/senha`, alterarSenhaInput);
  }

  public buscarTodosPorPaginacao(
    pagina: number,
    tamanho: number
  ): Observable<any> {
    return this.http.get(
      `${Backend.getBaseTrader}/paginacao?size=${tamanho}&page=${pagina}`
    );
  }

  public buscarTodosPorPaginacaoEParametro(
    pagina: number,
    tamanho: number,
    parametro: string,
    value: string
  ): Observable<any> {
    return this.http.get(
      `${Backend.getBaseTrader}/paginacao?${parametro}=${value}&size=${tamanho}&page=${pagina}`
    );
  }

  public recuperarSenha(
    recuperarSenhaInput: RecuperarSenhaInput
  ): Observable<any> {
    return this.http.put(
      `${Backend.getBaseTrader}/esqueci-senha`,
      recuperarSenhaInput
    );
  }

  public darPermissaoDeAdmin(id: number): Observable<any> {
    return this.http.put(`${Backend.getBaseTrader}/${id}/admin`, null);
  }

  public tirarPermissaoDeAdmin(id: number): Observable<any> {
    return this.http.delete(`${Backend.getBaseTrader}/${id}/admin`);
  }
}
