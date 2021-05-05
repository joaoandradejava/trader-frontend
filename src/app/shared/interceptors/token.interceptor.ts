import { TraderAutenticado } from './../models/trader-autenticado';
import { AutenticacaoService } from './../services/autenticacao.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.autenticacaoService.isAutenticado()) {
      let traderAutenticado: TraderAutenticado = this.autenticacaoService.getTraderAutenticado();

      let req = request.clone({
        setHeaders: { Authorization: traderAutenticado.token },
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}
