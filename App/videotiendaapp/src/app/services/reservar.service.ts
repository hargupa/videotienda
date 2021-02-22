import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import{Reserva} from './reservas';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

var servidor = "https://localhost:44309/api/";

@Injectable({
  providedIn: 'root'
})
export class ReservarService {
  private httpHeader = new HttpHeaders({'content-Type':'application/json'});

  constructor(private HttpClient:HttpClient) { }

  mostrarReservas():Observable<Reserva[]>{
    /*var headers = new HttpHeaders();
    headers = headers.set("Autorizacion","nose");*/
    return this.HttpClient.get<Reserva[]>(servidor+'Reservas',{responseType:"json"})
    .pipe(map(
      (data:Reserva[])=>{
        return data;
        
      }
    ))    
  }
  insertarReserva(NuevaReserva:Reserva):Observable<Reserva>{
    return this.HttpClient.post<Reserva>(servidor+'Reservas',NuevaReserva,{headers:this.httpHeader});

  }

  eliminarReserva(id:number):Observable<string>{
    return this.HttpClient.delete<string>(servidor+'Reservas/'+id);
  }

}
