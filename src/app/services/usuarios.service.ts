import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  /**
   * Creates an instance of UsuariosService.
   * 
   * @param {HttpClient} http
   * @memberof UsuariosService
   */
  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.apiURL + '/usuarios');
  }

  /**
   * Gets the clientes
   *
   * @return {*}  {Observable<Usuario[]>}
   * @memberof UsuariosService
   */
  getClientes(): Observable<Usuario[]> {

    let params = new HttpParams();
    params = params.append('rol', 'clientes');

    return this.http.get<Usuario[]>(environment.apiURL+ '/usuarios', { params: params });

  }

  /**
   * Gets the Administradores.
   *
   * @return {*}  {Observable<Usuario[]>}
   * @memberof UsuariosService
   */
  getAdministradores(): Observable<Usuario[]> {

    let params = new HttpParams();
    params = params.append('rol', 'administradores');

    return this.http.get<Usuario[]>(environment.apiURL + '/usuarios', { params: params });

  }

  /**
   * Gets a Usuario.
   *
   * @param {number} idUsuario
   * @return {*}  {Observable<Usuario>}
   * @memberof UsuariosService
   */
  getUsuario(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(environment.apiURL + '/usuarios/' + idUsuario);
  }

}
