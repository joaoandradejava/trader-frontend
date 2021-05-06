import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradersRoutingModule } from './traders-routing.module';
import { TradersComponent } from './traders.component';
import { TraderService } from 'src/app/shared/services/trader.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [TradersComponent],
  imports: [
    CommonModule,
    TradersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  providers: [TraderService],
})
export class TradersModule {}
