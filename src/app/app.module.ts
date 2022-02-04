import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  NO_ERRORS_SCHEMA,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { accountComponent } from './account/account.component';
import { myaccountComponent } from './account/myaccount.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index.component';
import { intercerptorProvider } from './interceptors/prod-interceptor.service';
import { MenuComponent } from './menu/menu.component';
import { EditPatentComponent } from './patentes/edit-patente/edit-patente.component';
import { ListaPatenteComponent } from './patentes/lista-patente/lista-patente.component';
import { NuevaPatenteComponent } from './patentes/nueva-patente/nueva-patente.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPatenteComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    NuevaPatenteComponent,
    accountComponent,
    EditPatentComponent,
    myaccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

    CommonModule,
  ],
  providers: [intercerptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
