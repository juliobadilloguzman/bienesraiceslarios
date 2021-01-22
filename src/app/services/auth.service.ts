import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccount } from '../models/create-account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signUp(account: CreateAccount): Observable<any> {
    return this.http.post<any>(this.API_URI + '/auth/signup', account);
  }

}
