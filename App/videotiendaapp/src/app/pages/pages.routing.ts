import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ListarvideosComponent } from './listarvideos/listarvideos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReservasComponent } from './reservas/reservas.component';



const routes: Routes = [
  {path:'login',component:LoginComponent,data:{titulo:'Login'}},
  {
    path:'dashboard',component:PagesComponent,children:[
      {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
      {path:'listarvideos',component:ListarvideosComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'reservas',component:ReservasComponent},
      //{path:'login',component:LoginComponent},
     // {path:'',component:LoginComponent,data:{titulo:'Login'}},

    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
