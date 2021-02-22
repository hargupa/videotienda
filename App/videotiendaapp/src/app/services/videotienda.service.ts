import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import{Pelicula} from './pelicula';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

var servidor = "https://localhost:44309/api/";
//var servidor = "/api/";

@Injectable({
  providedIn: 'root'
})
export class VideotiendaService {
  private httpHeader = new HttpHeaders({'content-Type':'application/json'});
  constructor(private HttpClient:HttpClient) { 

  }
  mostrarPeliculas():Observable<Pelicula[]>
  {
    /*var headers = new HttpHeaders();
    headers = headers.set("Autorizacion","nose");*/
    return this.HttpClient.get<Pelicula[]>(servidor+'Peliculas',{responseType:"json"})
    .pipe(map(
      (data:Pelicula[])=>{
        return data;
        
      }
    ))
  }
  insertarPelicula(NuevaPelicula:Pelicula):Observable<Pelicula>{
    return this.HttpClient.post<Pelicula>(servidor+'Peliculas',NuevaPelicula,{headers:this.httpHeader});

  }

  actualizarPelicula(existePelicula:Pelicula,id:number):Observable<Pelicula>{
    return this.HttpClient.put<Pelicula>(servidor+'Peliculas/'+id,existePelicula,{headers:this.httpHeader});
  }

  eliminarPelicula(id:number):Observable<string>{
    return this.HttpClient.delete<string>(servidor+'Peliculas/'+id);
  }

}
