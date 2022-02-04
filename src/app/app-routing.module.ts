import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NuevaPatenteComponent } from './patentes/nueva-patente/nueva-patente.component';
import { ListaPatenteComponent } from './patentes/lista-patente/lista-patente.component';
import { accountComponent } from './account/account.component';
import { myaccountComponent } from './account/myaccount.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'nuevapatente', component: NuevaPatenteComponent },
  { path: 'listapatente', component: ListaPatenteComponent },
  { path: 'myAccount', component: accountComponent },
  { path: 'myAccountBalance', component: myaccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
