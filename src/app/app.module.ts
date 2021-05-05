import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { NotAutenticadoGuard } from './shared/guards/not-autenticado.guard';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AutenticacaoService } from './shared/services/autenticacao.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { SnackbarService } from './shared/services/snackbar.service';
import { CadastroTraderComponent } from './views/cadastro-trader/cadastro-trader.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EsqueceuSenhaComponent } from './views/login/esqueceu-senha/esqueceu-senha.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TraderService } from './shared/services/trader.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CadastroTraderComponent,
    HomeComponent,
    EsqueceuSenhaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    TraderService,
    SnackbarService,
    AutenticacaoService,
    AutenticadoGuard,
    NotAutenticadoGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
