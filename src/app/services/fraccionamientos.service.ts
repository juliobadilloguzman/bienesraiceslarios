import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fraccionamiento } from '../models/fraccionamiento';

@Injectable({
  providedIn: 'root'
})
export class FraccionamientosService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getFraccionamientos(): Observable<Fraccionamiento[]> {
    return this.http.get<Fraccionamiento[]>(this.API_URI + '/fraccionamientos');
  }

  getFraccionamiento(idFraccionamiento: string | number): Observable<Fraccionamiento> {
    return this.http.get<Fraccionamiento>(this.API_URI + '/fraccionamientos/' + idFraccionamiento);
  }

  createFraccionamiento(fraccionamiento: Fraccionamiento): Observable<Fraccionamiento> {
    return this.http.post<Fraccionamiento>(this.API_URI + '/fraccionamientos', fraccionamiento);
  }

  updateFraccionamiento(fraccionamiento: Fraccionamiento): Observable<Fraccionamiento> {
    return this.http.patch<Fraccionamiento>(this.API_URI + '/fraccionamientos/' + fraccionamiento.idFraccionamiento, fraccionamiento);
  }

  deleteFraccionamiento(idFraccionamiento: number): Observable<any> {
    return this.http.delete(this.API_URI + '/fraccionamientos/' + idFraccionamiento);
  }

}
