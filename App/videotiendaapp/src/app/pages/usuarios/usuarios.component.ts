import {  Component, OnInit } from '@angular/core';
import{UsuariosService} from '../../services/usuarios.service';
import{Usuario} from 'src/app/services/usuarios';
import{Router} from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[]=[];
  usuarioModificar:Usuario[]=[];
  editarUsuario:Usuario = new Usuario();
  editIndex:number=0;
  eliminarUsuario:Usuario=new Usuario();
  nuevoUsuario:Usuario = new Usuario();
  textoBuscar:string="";  
  loginUsuario:string=sessionStorage.currentUser;
  administrador:boolean=false;    
  constructor(private servicio:UsuariosService,public router:Router, public location:Location) { }

  ngOnInit() {
    if (sessionStorage.currentPerfil=='Administrador'){
      this.administrador=true;
    }    
    this.cargarDatos();
  }

  cargarDatos(){
    this.servicio.mostrarUsuarios().subscribe(
      (response:Usuario[])=>{
        this.usuarios=response;

      }
    ) 
  }

  refrescar(){
    location.reload();
  }
  EditarClick(index:number){

      this.editarUsuario.IdUsuario=this.usuarios[index]['idusuario'];
      this.editarUsuario.Nombres=this.usuarios[index]['nombres'];
      this.editarUsuario.Perfil=this.usuarios[index]['perfil'];
      this.editarUsuario.Email=this.usuarios[index]['email'];
      //this.editarUsuario.Contrasena=this.usuarios[index['contrasena'];
      this.editIndex = index;

  }


  actualizar(id:number){

        this.servicio.actualizarUsuario(this.editarUsuario,id).subscribe((response:Usuario)=>{
          var p:Usuario=new Usuario();
          alert('Se actualizo el registro');
          this.cargarDatos();
          
          //p.IdPelicula=response.IdPelicula;
          //p.Titulo=response.Titulo;
          //p.Descripcion=response.Descripcion;
          //p.Actores=response.Actores;
          //p.Director=response.Director;
          //p.CostoAlquiler=response.CostoAlquiler;
          //p.Cantidad=response.Cantidad;
          //alert('Se actualizo el registro');
          this.usuarios[this.editIndex]=p;


        }
    )
  }

  eliminarClick(index:number){
    this.eliminarUsuario.IdUsuario = this.usuarios[index]['idusuario'];
    this.eliminarUsuario.Nombres= this.usuarios[index]['nombres'];
  }

  confirmaEliminar(){
    this.servicio.eliminarUsuario(this.eliminarUsuario.IdUsuario).subscribe(
      (response)=>{
        alert('Se Elimino el registro');
        this.cargarDatos();        
        this.eliminarUsuario.IdUsuario=0;
        this.eliminarUsuario.Nombres='';
      }
    )
  }

  buscarUsuario()
  {
    var tabla = '';
    var fila = '';
    var crearTabla='';
    var 
    crearTabla = ' <table class="table" id="tablaUsuarios">'+
    '<thead>'+
        '<th>ID Usuario</th>'+
        '<th>Nombres</th>'+
        '<th>Perfil</th>'+
        '<th>Email</th>'+
    '</thead>'+
    '<tbody>';

    for (let i=0; i<=this.usuarios.length-1;i++){
        var nombreUsuario = this.usuarios[i]['nombres'];
        nombreUsuario = nombreUsuario.toUpperCase();
        this.textoBuscar = this.textoBuscar.toUpperCase();

        console.log(nombreUsuario.indexOf(this.textoBuscar));
          if(nombreUsuario.indexOf(this.textoBuscar)>=0){
       
            fila='                <tr>'+
            '<td>'+this.usuarios[i]['idusuario']+'</td>'+
            '<td>'+this.usuarios[i]['nombres']+'</td>'+
            '<td>'+this.usuarios[i]['perfil']+'</td>'+
            '<td>'+this.usuarios[i]['email']+'</td>'+
            '<td>'+
                '<button class="btn btn-primary" (click)="EditarClick(i)" data-toggle="modal" data-target="#editModal" title="Editar Pelicula"><i class="fa fa-pencil" aria-hidden="true"></i></button>&nbsp;'+
                '<button class="btn btn-warning" (click)="eliminarClick(i)" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar Pelicula"></i></button>'+
            '</td>'+
        '</tr>';
            tabla = tabla + fila;
          }
    }
    crearTabla = crearTabla + tabla + '</tbody></table>';
    document.getElementById("crearTabla").innerHTML ='';
    document.getElementById("crearTabla").innerHTML = crearTabla;
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
      this.nuevoUsuario.Perfil='';
      this.nuevoUsuario.Email='';
      this.nuevoUsuario.Contrasena='';

      alert('Se Creo un nuevo registro');
      this.cargarDatos();
    },(error)=>{
      console.log(error+'  titulo:'+this.nuevoUsuario.Nombres);
    })
  }


}
