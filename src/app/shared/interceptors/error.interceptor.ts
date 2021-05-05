import { SnackbarService } from './../services/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.error.status == 403) {
          this.snackbarService.abrirMensagemError('Sessão expirada!', 5000);
          this.router.navigate(['login']);
          localStorage.clear();

          return throwError(error);
        }

        let mensagem: string = error.error.userMessage;
        this.snackbarService.abrirMensagemError(mensagem, 5000);

        return throwError(error);
      })
    );
  }
}
