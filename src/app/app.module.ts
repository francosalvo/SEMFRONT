import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './menu/menu.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
