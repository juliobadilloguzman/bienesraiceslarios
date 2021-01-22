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

  getFraccionamiento(idFraccionamiento: string | number): Observable<any> {
    return this.http.get<Fraccionamiento>(this.API_URI + '/fraccionamientos/' + idFraccionamiento);
  }

}
