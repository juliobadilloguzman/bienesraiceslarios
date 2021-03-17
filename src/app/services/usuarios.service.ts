import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'https://bienesraiceslarios.com/api';

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URI + '/usuarios');
  }

  getClientes(): Observable<Usuario[]> {

    let params = new HttpParams();
    params = params.append('rol', 'clientes');

    return this.http.get<Usuario[]>(this.API_URI + '/usuarios', { params: params });

  }

  getAdministradores(): Observable<Usuario[]> {

    let params = new HttpParams();
    params = params.append('rol', 'administradores');

    return this.http.get<Usuario[]>(this.API_URI + '/usuarios', { params: params });

  }

  getCapturistas(): Observable<Usuario[]> {

    let params = new HttpParams();
    params = params.append('rol', 'capturistas');

    return this.http.get<Usuario[]>(this.API_URI + '/usuarios', { params: params });

  }

  getUsuario(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API_URI + '/usuarios/' + idUsuario);
  }

}
