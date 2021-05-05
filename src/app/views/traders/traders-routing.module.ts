import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradersComponent } from './traders.component';

const routes: Routes = [{ path: '', component: TradersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradersRoutingModule { }
