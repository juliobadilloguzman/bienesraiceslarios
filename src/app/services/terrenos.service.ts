import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terreno } from '../models/terreno';

@Injectable({
  providedIn: 'root'
})
export class TerrenosService {

  API_URI = 'https://bienesraiceslarios.com/api';

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

  updateTerreno(idTerreno: number, terreno: Terreno): Observable<Terreno> {
    return this.http.patch<Terreno>(this.API_URI + '/terrenos/' + idTerreno, terreno);
  }
  
  deleteTerreno(idTerreno: number): Observable<any>{
    return this.http.delete<any>(this.API_URI + '/terrenos/' + idTerreno);
  }

  async isDuplicated(information: any): Promise<any>{
    return await this.http.post<any>(this.API_URI + '/terrenos/isDuplicated', information).toPromise();
  }

  changeStatus(idTerreno: number, estatusTerreno: any): Observable<any>{
    return this.http.patch(this.API_URI + '/terrenos/changeStatus/' + idTerreno, estatusTerreno);
  }

}
