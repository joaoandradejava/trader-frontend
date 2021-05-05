import { IsAdminGuard } from './../../shared/guards/is-admin.guard';
import { AcoesAdminComponent } from './acoes-admin/acoes-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcoesComponent } from './acoes.component';

const routes: Routes = [
  { path: '', component: AcoesComponent },
  {
    path: 'admin',
    component: AcoesAdminComponent,
    canActivate: [IsAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcoesRoutingModule {}
