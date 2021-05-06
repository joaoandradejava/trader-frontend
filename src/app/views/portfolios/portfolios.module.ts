import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { PortfoliosComponent } from './portfolios.component';


@NgModule({
  declarations: [PortfoliosComponent],
  imports: [
    CommonModule,
    PortfoliosRoutingModule
  ]
})
export class PortfoliosModule { }
