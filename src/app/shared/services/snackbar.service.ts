import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public abrirMensagemSucesso(mensagem: string, duracao: number): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      panelClass: ['snack-bar-success'],
      verticalPosition: 'top',
    });
  }

  public abrirMensagemError(mensagem: string, duracao: number): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      panelClass: ['snack-bar-danger'],
      verticalPosition: 'top',
    });
  }
}
