import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  /**
   * Creates an instance of VendedoresService.
   * 
   * @param {HttpClient} http
   * @memberof VendedoresService
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets all the vendedores
   *
   * @return {*}  {Observable<Vendedor[]>}
   * @memberof VendedoresService
   */
  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(environment.apiURL + '/vendedores');
  }

  /**
   * Get all the Vendedores.
   *
   * @param {(string | number)} idVendedor
   * @return {*}  {Observable<Vendedor>}
   * @memberof VendedoresService
   */
  getVendedor(idVendedor: string | number): Observable<Vendedor> {
    return this.http.get<Vendedor>(environment.apiURL + '/vendedores/' + idVendedor);
  }

  /**
   * Creates a Vendedor.
   *
   * @param {Vendedor} vendedor
   * @return {*}  {Observable<Vendedor>}
   * @memberof VendedoresService
   */
  createVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(environment.apiURL + '/vendedores', vendedor);
  }

  /**
   * Updates a Vendedor.
   *
   * @param {Vendedor} vendedor
   * @return {*}  {Observable<Vendedor>}
   * @memberof VendedoresService
   */
  updateVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.patch<Vendedor>(environment.apiURL + '/vendedores/' + vendedor.idVendedor, vendedor);
  }

  /**
   * Deletes a Vendedor.
   *
   * @param {number} idVendedor
   * @return {*}  {Observable<any>}
   * @memberof VendedoresService
   */
  deleteVendedor(idVendedor: number): Observable<any> {
    return this.http.delete(environment.apiURL + '/vendedores/' + idVendedor);
  }

}
