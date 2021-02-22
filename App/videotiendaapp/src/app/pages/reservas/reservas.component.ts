import {  Component, OnInit } from '@angular/core';
import{ReservarService} from '../../services/reservar.service';
import{VideotiendaService} from '../../services/videotienda.service';
import{Reserva} from 'src/app/services/reservas';
import{Router} from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import{Pelicula} from 'src/app/services/pelicula';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: [
  ]
})
export class ReservasComponent implements OnInit {
  IdUsuario:number=sessionStorage.currentIdUsuario;
  peliculas:Pelicula[]=[];
  reservas:Reserva[]=[];
  idPeliculaDevolver:number;
  nuevaReserva:Reserva = new Reserva();
  eliminarReserva:Reserva=new Reserva();
  editarPelicula:Pelicula = new Pelicula();
  editIndex:number=0;
  constructor(private serviciorReserva:ReservarService,private servicio:VideotiendaService) { }

  ngOnInit() {
    this.cargarDatos();
    this.cargarPeliculas();
  }

  cargarDatos(){
    this.serviciorReserva.mostrarReservas().subscribe(
      (response:Reserva[])=>{
        for(let i=0; i<=response.length-1;i++){
            if(response[i]['idcliente']==sessionStorage.currentIdUsuario){
              this.reservas.push(response[i]);
            }
        }
       
      }
    ) 
  }

  cargarPeliculas(){
    this.servicio.mostrarPeliculas().subscribe(
      (response:Pelicula[])=>{
        this.peliculas=response;
      }
    ) 
  }



  eliminarClick(index:number){
    this.eliminarReserva.IdReserva = this.reservas[index]['idreserva'];
    this.idPeliculaDevolver=this.reservas[index]['idpelicula'];
  }

  confirmaEliminar(){
    this.serviciorReserva.eliminarReserva(this.eliminarReserva.IdReserva).subscribe(
      (response)=>{
        this.DevolverPelicula(this.idPeliculaDevolver);
        
      }
    )
  }


  DevolverPelicula(id:number){

  for (let index=0; index<=this.peliculas.length-1;index++){
    if (this.peliculas[index]['idpelicula']==id){
      this.editarPelicula.IdPelicula=this.peliculas[index]['idpelicula'];
      this.editarPelicula.Titulo=this.peliculas[index]['titulo'];
      this.editarPelicula.Descripcion=this.peliculas[index]['descripcion'];
      this.editarPelicula.Actores=this.peliculas[index]['actores'];
      this.editarPelicula.Director=this.peliculas[index]['director'];
      this.editarPelicula.CostoAlquiler=this.peliculas[index]['costoalquiler'];
      this.editarPelicula.Cantidad=this.peliculas[index]['cantidad']+1;
    }
  }  
    this.actualizar(id);

}
 actualizar(id:number){

        this.servicio.actualizarPelicula(this.editarPelicula,id).subscribe((response:Pelicula)=>{
          var p:Pelicula=new Pelicula();
          alert('Se ha devuelto la Pelicula!!')
          
          
          this.peliculas[this.editIndex]=p;

          this.editarPelicula.IdPelicula=0;
          this.editarPelicula.Titulo='';
          this.editarPelicula.Descripcion='';
          this.editarPelicula.Actores='';
          this.editarPelicula.Director='';
          this.editarPelicula.CostoAlquiler=0;
          this.editarPelicula.Cantidad=0;
          this.cargarDatos();
          location.reload();
        }
    )
  }




}
