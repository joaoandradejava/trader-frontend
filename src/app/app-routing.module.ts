import { NotAutenticadoGuard } from './shared/guards/not-autenticado.guard';
import { HomeComponent } from './views/home/home.component';
import { CadastroTraderComponent } from './views/cadastro-trader/cadastro-trader.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAutenticadoGuard],
  },
  {
    path: 'cadastro-trader',
    component: CadastroTraderComponent,
    canActivate: [NotAutenticadoGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AutenticadoGuard] },
  {
    path: 'acoes',
    loadChildren: () =>
      import('./views/acoes/acoes.module').then((m) => m.AcoesModule),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'traders',
    loadChildren: () =>
      import('./views/traders/traders.module').then((m) => m.TradersModule),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'editar-dados',
    loadChildren: () =>
      import('./views/editar-dados/editar-dados.module').then(
        (m) => m.EditarDadosModule
      ),
    canActivate: [AutenticadoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
