import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import {PagesRoutingModule} from './pages/pages.routing';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'**',component:NopagefoundComponent},
  //{path:'',redirectTo:'/dashboard',pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
