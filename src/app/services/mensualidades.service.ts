import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensualidad } from '../models/mensualidad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensualidadesService {

  /**
   * Creates an instance of MensualidadesService.
   * 
   * @param {HttpClient} http
   * @memberof MensualidadesService
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all the Mensualidades
   *
   * @return {*}  {Observable<Mensualidad[]>}
   * @memberof MensualidadesService
   */
  getMensualidades(): Observable<Mensualidad[]> {
    return this.http.get<Mensualidad[]>(environment.apiURL + '/mensualidades');
  }

  /**
   * Get a mensualidad by its id.
   *
   * @param {(string | number)} idMensualidad
   * @return {*}  {Observable<Mensualidad>}
   * @memberof MensualidadesService
   */
  getMensualidad(idMensualidad: string | number): Observable<Mensualidad> {
    return this.http.get<Mensualidad>(environment.apiURL + '/mensualidades/' + idMensualidad);
  }

  /**
   * Get all the mensualidades of a Terreno.
   *
   * @param {(string | number)} idTerreno
   * @return {*}  {Observable<Mensualidad[]>}
   * @memberof MensualidadesService
   */
  getMensualidadesFromTerreno(idTerreno: string | number): Observable<Mensualidad[]> {
    return this.http.get<Mensualidad[]>(environment.apiURL + '/mensualidades/terreno/' + idTerreno);
  }

  /**
   * Creates a Mensualidad.
   *
   * @param {Mensualidad} mensualidad
   * @return {*}  {Observable<Mensualidad>}
   * @memberof MensualidadesService
   */
  createMensualidad(mensualidad: Mensualidad): Observable<Mensualidad> {
    return this.http.post<Mensualidad>(environment.apiURL + '/mensualidades', mensualidad);
  }

  /**
   * Updates a Mensualidad.
   *
   * @param {Mensualidad} mensualidad
   * @return {*}  {Observable<Mensualidad>}
   * @memberof MensualidadesService
   */
  updateMensualidad(mensualidad: Mensualidad): Observable<Mensualidad> {
    return this.http.patch<Mensualidad>(environment.apiURL + '/mensualidades/' + mensualidad.idMensualidad, mensualidad);
  }

  /**
   * Deletes a mensualidad.
   *
   * @param {number} idMensualidad
   * @return {*}  {Observable<any>}
   * @memberof MensualidadesService
   */
  deleteMensualidad(idMensualidad: number): Observable<any> {
    return this.http.delete(environment.apiURL + '/mensualidades/' + idMensualidad);
  }

}
