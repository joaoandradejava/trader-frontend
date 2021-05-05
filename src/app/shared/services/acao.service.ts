import { AcaoInput } from './../models/acao-input';
import { map } from 'rxjs/operators';
import { AcaoModel } from './../models/acao-model';
import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcaoService {
  constructor(private http: HttpClient) {}

  public buscarTodas(): Observable<any> {
    return this.http
      .get(`${Backend.getBaseAcao}`)
      .pipe(map((acoes: AcaoModel[]) => acoes));
  }

  public buscarTodasPorPaginacao(
    pagina: number,
    tamanho: number
  ): Observable<any> {
    return this.http.get(
      `${Backend.getBaseAcao}/paginacao?page=${pagina}&size=${tamanho}`
    );
  }

  public buscarPorId(id: any): Observable<any> {
    return this.http.get(`${Backend.getBaseAcao}/${id}`);
  }

  public salvar(acaoInput: AcaoInput): Observable<any> {
    return this.http.post(`${Backend.getBaseAcao}`, acaoInput);
  }

  public atualizar(id: any, acaoInput: AcaoInput): Observable<any> {
    return this.http.put(`${Backend.getBaseAcao}/${id}`, acaoInput);
  }

  public deletarPorId(id: any): Observable<any> {
    return this.http.delete(`${Backend.getBaseAcao}/${id}`);
  }
}
