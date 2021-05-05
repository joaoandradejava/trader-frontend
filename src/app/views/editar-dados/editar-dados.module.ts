import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarDadosRoutingModule } from './editar-dados-routing.module';
import { EditarDadosComponent } from './editar-dados.component';
import { MatButtonModule } from '@angular/material/button';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [EditarDadosComponent, AlterarSenhaComponent],
  imports: [
    CommonModule,
    EditarDadosRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class EditarDadosModule {}
