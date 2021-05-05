import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradersRoutingModule } from './traders-routing.module';
import { TradersComponent } from './traders.component';
import { TraderService } from 'src/app/shared/services/trader.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TradersComponent],
  imports: [
    CommonModule,
    TradersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [TraderService],
})
export class TradersModule {}
