import {  Component, OnInit } from '@angular/core';
import{UsuariosService} from '../../services/usuarios.service';
import{Usuario} from 'src/app/services/usuarios';
import{Router} from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  usuarios:Usuario[]=[];
  email:string='';
  contrasena:string='';
  nuevoUsuario:Usuario = new Usuario();

  constructor(private servicio:UsuariosService,public router:Router, public location:Location) {
    this.nuevoUsuario.Perfil='Cliente';
   }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(){
    this.servicio.mostrarUsuarios().subscribe(
      (response:Usuario[])=>{
        sessionStorage.clear();     
        this.usuarios=response;

      }
    ) 
  }
  logeo(){
    var ContadorError=0;
    for (let i=0; i<=this.usuarios.length-1;i++){
      var usuario = this.usuarios[i]['email'];
      var psw = this.usuarios[i]['contrasena'];
      usuario = usuario.toUpperCase();
      this.email = this.email.toUpperCase();
      if (this.email == usuario && psw==this.contrasena){
        sessionStorage.currentUser=this.usuarios[i]['nombres'];
        sessionStorage.currentPerfil=this.usuarios[i]['perfil'];
        sessionStorage.currentIdUsuario=this.usuarios[i]['idusuario'];
        ContadorError=0;
        return this.router.navigateByUrl("/dashboard");
      }else{
        ContadorError++;
        //alert('Usuario o Contraseña incorrectos!!!');
      }

    }
    if (ContadorError>0){
      alert('Usuario o Contraseña incorrectos!!!');

    }
  }
  GuardarClick(){
    this.servicio.insertarUsuario(this.nuevoUsuario).subscribe((response)=>{
      var p:Usuario = new Usuario();
      //p.ID =1;
      
      p.Nombres=response.Nombres;
      p.Perfil=response.Perfil;
      p.Email=response.Email;
      p.Contrasena=response.Contrasena;

      this.usuarios.push(p);
      this.usuarios.push(this.nuevoUsuario);
      this.nuevoUsuario.IdUsuario=0;
      this.nuevoUsuario.Nombres='';
      this.nuevoUsuario.Email='';
      this.nuevoUsuario.Contrasena='';

      alert('Se ha realizado su registro correctamente!!');
      this.cargarDatos();
    },(error)=>{
      console.log(error+'  titulo:'+this.nuevoUsuario.Nombres);
    })
  }


}
