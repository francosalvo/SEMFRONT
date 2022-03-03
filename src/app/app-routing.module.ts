import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/registro/register.component';
import { NewPatentComponent } from './patentes/nueva-patente/newPatent.component';
import { ListaPatenteComponent } from './patentes/lista-patente/lista-patente.component';
import { accountComponent } from './account/account.component';
import { myaccountComponent } from './account/myaccount.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'newPatent', component: NewPatentComponent },
  { path: 'listapatente', component: ListaPatenteComponent },
  { path: 'myAccount', component: accountComponent },
  { path: 'myAccountBalance', component: myaccountComponent },
  { path: 'myHistory', component: HistoryComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
