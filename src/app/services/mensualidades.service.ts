import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensualidad } from '../models/mensualidad';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensualidadesService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getMensualidades(): Observable<Mensualidad[]> {
    return this.http.get<Mensualidad[]>(this.API_URI + '/mensualidades');
  }

  getMensualidad(idMensualidad: string | number): Observable<Mensualidad> {
    return this.http.get<Mensualidad>(this.API_URI + '/mensualidades/' + idMensualidad);
  }

  getMensualidadesFromTerreno(idTerreno: string | number): Observable<Mensualidad[]> {
    return this.http.get<Mensualidad[]>(this.API_URI + '/mensualidades/terreno/' + idTerreno);
  }

  createMensualidad(mensualidad: Mensualidad): Observable<Mensualidad> {
    return this.http.post<Mensualidad>(this.API_URI + '/mensualidades', mensualidad);
  }

  updateMensualidad(mensualidad: Mensualidad): Observable<Mensualidad> {
    return this.http.patch<Mensualidad>(this.API_URI + '/mensualidades/' + mensualidad.idMensualidad, mensualidad);
  }

  deleteMensualidad(idMensualidad: number): Observable<any> {
    return this.http.delete(this.API_URI + '/mensualidads/' + idMensualidad);
  }
}
