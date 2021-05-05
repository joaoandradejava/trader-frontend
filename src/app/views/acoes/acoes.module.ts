import { IsAdminGuard } from './../../shared/guards/is-admin.guard';
import { AcaoService } from './../../shared/services/acao.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcoesRoutingModule } from './acoes-routing.module';
import { AcoesComponent } from './acoes.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AcaoCardComponent } from './acao-card/acao-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AcoesAdminComponent } from './acoes-admin/acoes-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { AcoesCreateAndUpdateComponent } from './acoes-create-and-update/acoes-create-and-update.component';

@NgModule({
  declarations: [AcoesComponent, AcaoCardComponent, AcoesAdminComponent, AcoesCreateAndUpdateComponent],
  imports: [
    CommonModule,
    AcoesRoutingModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDialogModule
  ],
  providers: [AcaoService, IsAdminGuard],
})
export class AcoesModule {}
