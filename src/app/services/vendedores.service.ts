import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  API_URI = 'http://bienesraiceslarios.com:8000/api';

  constructor(private http: HttpClient) { }

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.API_URI + '/vendedores');
  }

  getVendedor(idVendedor: string | number): Observable<Vendedor> {
    return this.http.get<Vendedor>(this.API_URI + '/vendedores/' + idVendedor);
  }

  createVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.API_URI + '/vendedores', vendedor);
  }

  updateVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.patch<Vendedor>(this.API_URI + '/vendedores/' + vendedor.idVendedor, vendedor);
  }

  deleteVendedor(idVendedor: number): Observable<any> {
    return this.http.delete(this.API_URI + '/vendedores/' + idVendedor);
  }

}
