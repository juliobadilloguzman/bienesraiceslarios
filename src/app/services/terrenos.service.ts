import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terreno } from '../models/terreno';

@Injectable({
  providedIn: 'root'
})
export class TerrenosService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getTerrenos(): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(this.API_URI + '/terrenos');
  }

  getTerreno(idTerreno: string | number): Observable<Terreno> {
    return this.http.get<Terreno>(this.API_URI + '/terrenos/' + idTerreno);
  }

  getTerrenosFromUsuario(idUsuario: string | number): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(this.API_URI + '/terrenos/usuario/' + idUsuario);
  }

  createTerreno(terreno: Terreno): Observable<Terreno> {
    return this.http.post<Terreno>(this.API_URI + '/terrenos', terreno);
  }

}
