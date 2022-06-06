import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fraccionamiento } from '../models/fraccionamiento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FraccionamientosService {

  /**
   * Creates an instance of FraccionamientosService.
   * 
   * @param {HttpClient} http
   * @memberof FraccionamientosService
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all the Fraccionamientos.
   *
   * @return {*}  {Observable<Fraccionamiento[]>}
   * @memberof FraccionamientosService
   */
  getFraccionamientos(): Observable<Fraccionamiento[]> {
    return this.http.get<Fraccionamiento[]>(environment.apiURL + '/fraccionamientos');
  }

  /**
   * Get a Fraccionamiento by its id.
   *
   * @param {(string | number)} idFraccionamiento
   * @return {*}  {Observable<Fraccionamiento>}
   * @memberof FraccionamientosService
   */
  getFraccionamiento(idFraccionamiento: string | number): Observable<Fraccionamiento> {
    return this.http.get<Fraccionamiento>(environment.apiURL + '/fraccionamientos/' + idFraccionamiento);
  }

  /**
   * Creates a Fraccionamiento.
   *
   * @param {Fraccionamiento} fraccionamiento
   * @return {*}  {Observable<Fraccionamiento>}
   * @memberof FraccionamientosService
   */
  createFraccionamiento(fraccionamiento: Fraccionamiento): Observable<Fraccionamiento> {
    return this.http.post<Fraccionamiento>(environment.apiURL + '/fraccionamientos', fraccionamiento);
  }

  /**
   * Updates a Fraccionamiento.
   *
   * @param {Fraccionamiento} fraccionamiento
   * @return {*}  {Observable<Fraccionamiento>}
   * @memberof FraccionamientosService
   */
  updateFraccionamiento(fraccionamiento: Fraccionamiento): Observable<Fraccionamiento> {
    return this.http.patch<Fraccionamiento>(environment.apiURL + '/fraccionamientos/' + fraccionamiento.idFraccionamiento, fraccionamiento);
  }

  /**
   * Deletes a Fraccionamiento.
   *
   * @param {number} idFraccionamiento
   * @return {*}  {Observable<any>}
   * @memberof FraccionamientosService
   */
  deleteFraccionamiento(idFraccionamiento: number): Observable<any> {
    return this.http.delete(environment.apiURL + '/fraccionamientos/' + idFraccionamiento);
  }

}
