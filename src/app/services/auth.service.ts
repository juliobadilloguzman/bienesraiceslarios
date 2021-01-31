import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { CreateAccount } from '../models/create-account';
import { UpdateAccount } from '../models/update-account';
import { AuthResponse } from '../models/auth-response';
import { map, tap } from 'rxjs/operators';
import { Account } from '../models/account';
import { Rol } from '../models/rol';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:8000/api';

  private _account = new BehaviorSubject<Account>(null);
  private activeLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  get isAuthenticated() {
    return this._account.asObservable().pipe(
      map(account => {
        if (account) {
          return !!account.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._account.asObservable().pipe(map(account => {
      if (account) {
        return account.idUsuario;
      } else {
        return null;
      }
    })
    );
  }

  get accountId() {
    return this._account.asObservable().pipe(map(account => {
      if (account) {
        return account.idCuenta;
      } else {
        return null;
      }
    })
    );
  }

  signUp(account: CreateAccount): Observable<any> {
    return this.http.post<any>(this.API_URI + '/auth/signup', account);
  }

  logIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URI}/auth/login`,
      { email: email, password: password }
    ).pipe(tap(this.setAccountData.bind(this)));
  }

  updateAccount(account: UpdateAccount): Observable<any> {
    return this.http.patch<UpdateAccount>(this.API_URI + '/auth/account/' + account.idUsuario, account);
  }

  changePassword(idCuenta: number, password: string): Observable<any> {
    return this.http.patch<{ password: string }>(this.API_URI + '/auth/account/changePassword/' + idCuenta, { password: password });
  }

  deleteAccount(idUsuario: number) {
    return this.http.delete(this.API_URI + '/auth/account/' + idUsuario);
  }

  private storeAuthData(
    idCuenta: number,
    idUsuario: number,
    token: string,
    tokenExpirationDate: string,
    email: string,
    roles: Rol[]
  ) {
    const data = JSON.stringify({
      idCuenta: idCuenta,
      idUsuario: idUsuario,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email,
      roles: roles
    });
    localStorage.setItem('authData', data);
  }

  autoLogin() {
    return from(this.getStoredData()).pipe(
      map(storedData => {

        if (localStorage.getItem("authData") === null) {
          return null;
        }

        const parsedData = JSON.parse(storedData) as {
          idCuenta: number;
          idUsuario: number;
          email: string;
          token: string;
          tokenExpirationDate: string;
          roles: Rol[]
        };

        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const account = new Account(
          parsedData.idCuenta,
          parsedData.idUsuario,
          parsedData.email,
          parsedData.token,
          expirationTime,
          parsedData.roles
        );
        return account;
      }),
      tap(account => {
        if (account) {
          this._account.next(account);
          this.autoLogout(account.tokenDuration);
        }
      }),
      map(account => {
        return !!account;
      })
    );
  }

  getStoredData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem('authData'))
    });
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logOut();
    }, duration);
  }

  logOut() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._account.next(null);
    localStorage.removeItem('authData');
    this.router.navigateByUrl('/');
  }

  private setAccountData(accountData: AuthResponse) {
    const expirationTime = new Date(
      new Date().getTime() + +accountData.expiresIn * 1000
    );
    const account = new Account(
      accountData.idCuenta,
      accountData.idUsuario,
      accountData.email,
      accountData.token,
      expirationTime,
      accountData.roles
    );
    this._account.next(account);
    this.autoLogout(account.tokenDuration);
    this.storeAuthData(
      accountData.idCuenta,
      accountData.idUsuario,
      accountData.token,
      expirationTime.toISOString(),
      accountData.email,
      accountData.roles
    );
  }

}
