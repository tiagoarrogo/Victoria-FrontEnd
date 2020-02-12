import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import localept from '@angular/common/locales/pt';
import localeExtraPT from '@angular/common/locales/extra/pt';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts-x';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localept, 'pt',  localeExtraPT);
import { VendasService } from '../services/vendas.services';
import { HttpClientModule } from '@angular/common/http';
import { LojasService } from '../services/lojas.service';
import { TipoProdutoService } from '../services/tipoProduto.service';
import { MarcaService } from '../services/marca.service';
import { ProdutoService } from '../services/produto.service';
import { MetasService } from '../services/metas.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { UsuarioService } from '../services/usuario.service';



@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide:LOCALE_ID, useValue: "pt" },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    UsuarioService,
    AuthService,
    StorageService,
    VendasService,
    LojasService,
    TipoProdutoService,
    MarcaService,
    ProdutoService,
    MetasService
  ]
})
export class AppModule {}
