import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terreno } from '../models/terreno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerrenosService {

  /**
   * Creates an instance of TerrenosService.
   * 
   * @param {HttpClient} http
   * @memberof TerrenosService
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all the terrenos.
   *
   * @return {*}  {Observable<Terreno[]>}
   * @memberof TerrenosService
   */
  getTerrenos(): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(environment.apiURL + '/terrenos');
  }
  
  /**
   * Gets a Terreno by its uuid.
   *
   * @param {(string | number)} idTerreno
   * @return {*}  {Observable<Terreno>}
   * @memberof TerrenosService
   */
  getTerrenoByUuid(uuidTerreno: string): Observable<Terreno> {
    return this.http.get<Terreno>(environment.apiURL + '/terrenos/' + uuidTerreno);
  }

  /**
   * Gets a Terreno from a Usuario.
   *
   * @param {(string | number)} idUsuario
   * @return {*}  {Observable<Terreno[]>}
   * @memberof TerrenosService
   */
  getTerrenosFromUsuario(idUsuario: string | number): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(environment.apiURL + '/terrenos/usuario/' + idUsuario);
  }

  /**
   * Creates a Terreno.
   *
   * @param {Terreno} terreno
   * @return {*}  {Observable<Terreno>}
   * @memberof TerrenosService
   */
  createTerreno(terreno: Terreno): Observable<Terreno> {
    return this.http.post<Terreno>(environment.apiURL + '/terrenos', terreno);
  }

  /**
   * Updates a Terreno.
   *
   * @param {number} idTerreno
   * @param {Terreno} terreno
   * @return {*}  {Observable<Terreno>}
   * @memberof TerrenosService
   */
  updateTerreno(idTerreno: number, terreno: Terreno): Observable<Terreno> {
    return this.http.patch<Terreno>(environment.apiURL + '/terrenos/' + idTerreno, terreno);
  }
  
  /**
   * Deletes a Terreno.
   *
   * @param {number} idTerreno
   * @return {*}  {Observable<any>}
   * @memberof TerrenosService
   */
  deleteTerreno(idTerreno: number): Observable<any>{
    return this.http.delete<any>(environment.apiURL+ '/terrenos/' + idTerreno);
  }

  /**
   * Check if a Terreno is duplicated.
   *
   * @param {*} information
   * @return {*}  {Observable<any>}
   * @memberof TerrenosService
   */
  isDuplicated(information: any): Observable<any>{
    return this.http.post<any>(environment.apiURL + '/terrenos/isDuplicated', information);
  }

  /**
   * Changes the status of a Terreno.
   *
   * @param {number} idTerreno
   * @param {*} estatusTerreno
   * @return {*}  {Observable<any>}
   * @memberof TerrenosService
   */
  changeStatus(idTerreno: number, estatusTerreno: any): Observable<any>{
    return this.http.patch(environment.apiURL + '/terrenos/changeStatus/' + idTerreno, estatusTerreno);
  }

}
