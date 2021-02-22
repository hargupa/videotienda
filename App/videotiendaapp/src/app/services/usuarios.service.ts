import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import{Usuario} from './usuarios';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


var servidor = "https://localhost:44309/api/";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpHeader = new HttpHeaders({'content-Type':'application/json'});
  constructor(private HttpClient:HttpClient) { }
  mostrarUsuarios():Observable<Usuario[]>{
    /*var headers = new HttpHeaders();
    headers = headers.set("Autorizacion","nose");*/
    return this.HttpClient.get<Usuario[]>(servidor+'Usuarios',{responseType:"json"})
    .pipe(map(
      (data:Usuario[])=>{
        return data;
        
      }
    ))    
  }

  insertarUsuario(NuevoUsuario:Usuario):Observable<Usuario>{
    return this.HttpClient.post<Usuario>(servidor+'Usuarios',NuevoUsuario,{headers:this.httpHeader});

  }

  actualizarUsuario(existeUsuario:Usuario,id:number):Observable<Usuario>{
    return this.HttpClient.put<Usuario>(servidor+'Usuarios/'+id,existeUsuario,{headers:this.httpHeader});
  }

  eliminarUsuario(id:number):Observable<string>{
    return this.HttpClient.delete<string>(servidor+'Usuarios/'+id);
  }

}
