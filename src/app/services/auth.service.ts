import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccount } from '../models/create-account';
import { UpdateAccount } from '../models/update-account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signUp(account: CreateAccount): Observable<any> {
    return this.http.post<any>(this.API_URI + '/auth/signup', account);
  }

  updateAccount(account: UpdateAccount): Observable<any> {
    return this.http.patch<UpdateAccount>(this.API_URI + '/auth/account/' + account.idUsuario, account)
  }

}
