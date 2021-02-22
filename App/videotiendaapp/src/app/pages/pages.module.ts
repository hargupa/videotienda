import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../auth/login/login.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ListarvideosComponent } from './listarvideos/listarvideos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReservasComponent } from './reservas/reservas.component';




@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    PagesComponent,
    ListarvideosComponent,
    UsuariosComponent,
    ReservasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
    LoginComponent,

  ]
})
export class PagesModule { }
