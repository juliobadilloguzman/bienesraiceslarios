import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  constructor(private http: HttpClient) { }

  getTerrenosFromFraccionamiento(fraccionamiento: string): Observable<any>{
    switch (fraccionamiento) {
      case 'realcampestre':
        return this.http.get('assets/cotizador/fraccionamientos/realcampestre.json');
        break;
    
      default:
        break;
    }
  }

}
