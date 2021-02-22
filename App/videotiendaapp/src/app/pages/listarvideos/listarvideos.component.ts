import {  Component, OnInit } from '@angular/core';
import{VideotiendaService} from '../../services/videotienda.service';
import{ReservarService} from '../../services/reservar.service';
import{Pelicula} from 'src/app/services/pelicula';
import{Reserva} from 'src/app/services/reservas';
import{Router} from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-listarvideos',
  templateUrl: './listarvideos.component.html',
  styles: [
  ]
})
export class ListarvideosComponent implements OnInit {
  peliculas:Pelicula[]=[];
  reservas:Reserva[]=[];
  peliculaModificar:Pelicula[]=[];
  editarPelicula:Pelicula = new Pelicula();
  editIndex:number=0;
  eliminarPelicula:Pelicula=new Pelicula();
  nuevaPelicula:Pelicula = new Pelicula();
  nuevaReserva:Reserva = new Reserva();
  textoBuscar:string="";
  loginUsuario:string=sessionStorage.currentUser;
  administrador:boolean=false; 
  cliente:boolean=false;  
  constructor(private servicio:VideotiendaService,private servicioReserva:ReservarService  ,public router:Router, public location:Location) { }

  ngOnInit() {
    if (sessionStorage.currentPerfil=='Administrador'){
      this.administrador=true;
    }
    if(sessionStorage.currentPerfil=='Cliente'){
      this.cliente=true; 
    }
    this.cargarDatos();
  }

  cargarDatos(){
    this.servicio.mostrarPeliculas().subscribe(
      (response:Pelicula[])=>{
        this.peliculas=response;
      }
    ) 
  }



  refrescar(){
    location.reload();
  }
  EditarClick(index:number){

      this.editarPelicula.IdPelicula=this.peliculas[index]['idpelicula'];
      this.editarPelicula.Titulo=this.peliculas[index]['titulo'];
      this.editarPelicula.Descripcion=this.peliculas[index]['descripcion'];
      this.editarPelicula.Actores=this.peliculas[index]['actores'];
      this.editarPelicula.Director=this.peliculas[index]['director'];
      this.editarPelicula.CostoAlquiler=this.peliculas[index]['costoalquiler'];
      this.editarPelicula.Cantidad=this.peliculas[index]['cantidad'];
      this.editIndex = index;

  }


  actualizar(id:number){

        this.servicio.actualizarPelicula(this.editarPelicula,id).subscribe((response:Pelicula)=>{
          var p:Pelicula=new Pelicula();
          if(this.cliente){
            alert('Se registro su prestamo satisfactoriamente!!!');
          }else{
            alert('Se actualizo el registro');

          }
          this.cargarDatos();
          
          //p.IdPelicula=response.IdPelicula;
          //p.Titulo=response.Titulo;
          //p.Descripcion=response.Descripcion;
          //p.Actores=response.Actores;
          //p.Director=response.Director;
          //p.CostoAlquiler=response.CostoAlquiler;
          //p.Cantidad=response.Cantidad;
          //alert('Se actualizo el registro');
          this.peliculas[this.editIndex]=p;

          this.editarPelicula.IdPelicula=0;
          this.editarPelicula.Titulo='';
          this.editarPelicula.Descripcion='';
          this.editarPelicula.Actores='';
          this.editarPelicula.Director='';
          this.editarPelicula.CostoAlquiler=0;
          this.editarPelicula.Cantidad=0;
         
          
          

        }
    )
  }

  eliminarClick(index:number){
    this.eliminarPelicula.IdPelicula = this.peliculas[index]['idpelicula'];
    this.eliminarPelicula.Titulo= this.peliculas[index]['titulo'];
  }

  confirmaEliminar(){
    this.servicio.eliminarPelicula(this.eliminarPelicula.IdPelicula).subscribe(
      (response)=>{
        alert('Se Elimino el registro');
        this.cargarDatos();        
        this.eliminarPelicula.IdPelicula=0;
        this.eliminarPelicula.Titulo='';
      }
    )
  }

  buscarPelicula()
  {
    var tabla = '';
    var fila = '';
    var crearTabla='';
    var 
    crearTabla = ' <table class="table" id="tablaPeliculas">'+
    '<thead>'+
        '<th>ID Pelicula</th>'+
        '<th>Titulo</th>'+
        '<th>Descripcion</th>'+
        '<th>Actores</th>'+
        '<th>Director</th>'+
        '<th>Costo Alquiler</th>'+
        '<th>Cant Disponible</th>'+
    '</thead>'+
    '<tbody>';

    for (let i=0; i<=this.peliculas.length-1;i++){
        var nombrePelicula = this.peliculas[i]['titulo'];
        nombrePelicula = nombrePelicula.toUpperCase();
        this.textoBuscar = this.textoBuscar.toUpperCase();

        console.log(nombrePelicula.indexOf(this.textoBuscar));
          if(nombrePelicula.indexOf(this.textoBuscar)>=0){
            
            fila='                <tr>'+
            '<td>'+this.peliculas[i]['idpelicula']+'</td>'+
            '<td>'+this.peliculas[i]['titulo']+'</td>'+
            '<td>'+this.peliculas[i]['descripcion']+'</td>'+
            '<td>'+this.peliculas[i]['actores']+'</td>'+
            '<td>'+this.peliculas[i]['director']+'</td>'+
            '<td>'+this.peliculas[i]['costoalquiler']+'</td>'+
            '<td>'+this.peliculas[i]['cantidad']+'</td>'+
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
    this.servicio.insertarPelicula(this.nuevaPelicula).subscribe((response)=>{
      var p:Pelicula = new Pelicula();
      //p.ID =1;
      p.Titulo=response.Titulo;
      p.Descripcion=response.Descripcion;
      p.Actores=response.Actores;
      p.Director=response.Director;
      p.CostoAlquiler=response.CostoAlquiler;
      p.Cantidad=response.Cantidad;
      this.peliculas.push(p);
      this.peliculas.push(this.nuevaPelicula);
      this.nuevaPelicula.IdPelicula=0;
      this.nuevaPelicula.Titulo='';
      this.nuevaPelicula.Descripcion='';
      this.nuevaPelicula.Director='';
      this.nuevaPelicula.Actores='';
      this.nuevaPelicula.CostoAlquiler=0;
      this.nuevaPelicula.Cantidad=0;
      alert('Se Creo un nuevo registro');
      this.cargarDatos();
    },(error)=>{
      console.log(error+'  titulo:'+this.nuevaPelicula.Titulo);
    })
  }

  PrestarClick(index:number){

    this.editarPelicula.IdPelicula=this.peliculas[index]['idpelicula'];
    this.editarPelicula.Titulo=this.peliculas[index]['titulo'];
    this.editarPelicula.Descripcion=this.peliculas[index]['descripcion'];
    this.editarPelicula.Actores=this.peliculas[index]['actores'];
    this.editarPelicula.Director=this.peliculas[index]['director'];
    this.editarPelicula.CostoAlquiler=this.peliculas[index]['costoalquiler'];
    if (this.peliculas[index]['cantidad']>0){
      this.editarPelicula.Cantidad=this.peliculas[index]['cantidad']-1;

    }else{
        alert('No hay peliculas para Alquilar');
        return false;
    }
    this.editIndex = index;
    this.actualizar(this.peliculas[index]['idpelicula']);
    this.nuevaReserva.IdPelicula=this.peliculas[index]['idpelicula'];
    this.nuevaReserva.IdCliente=sessionStorage.currentIdUsuario;
    var fechaActual = new Date()
    this.nuevaReserva.Fecha=fechaActual.getFullYear()+'-'+fechaActual.getMonth()+'-'+fechaActual.getDate();
    this.GuardarReserva();

}



GuardarReserva(){
  this.servicioReserva.insertarReserva(this.nuevaReserva).subscribe((response)=>{
    var p:Reserva = new Reserva();
    //p.ID =1;
    p.IdPelicula=response.IdPelicula;
    p.IdCliente=response.IdCliente;
    p.Fecha=response.Fecha;
    this.reservas.push(p);
    this.reservas.push(this.nuevaReserva);
    this.nuevaReserva.IdPelicula=0;
    this.nuevaReserva.IdCliente=0;
    this.nuevaReserva.Fecha='';    
    //alert('Se Realizo reserva de la Pelicula');
    this.cargarDatos();
  },(error)=>{
    console.log(error+'  titulo:'+this.nuevaReserva.IdPelicula);
  })
}









}
