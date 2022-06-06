import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { CreateAccount } from '../models/create-account';
import { UpdateAccount } from '../models/update-account';
import { AuthResponse } from '../models/auth-response';
import { map, tap } from 'rxjs/operators';
import { Account } from '../models/account';
import { Rol } from '../models/rol';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Behaviour subject of the account.
   *
   * @private
   * @memberof AuthService
   */
  private _account = new BehaviorSubject<Account>(null);

  /**
   * Timer.
   *
   * @private
   * @type {*}
   * @memberof AuthService
   */
  private activeLogoutTimer: any;

  /**
   * Creates an instance of AuthService.
   * 
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof AuthService
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Returns an observable if is authenticated.
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof AuthService
   */
  get isAuthenticated(): Observable<boolean> {

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

  /**
   * Returns an Observable with the user id.
   *
   * @readonly
   * @type {Observabl3<number>}
   * @memberof AuthService
   */
  get userId(): Observable<number> {

    return this._account.asObservable().pipe(
      
      map(account => {

        if (account) {
          return account.idUsuario;
        } else {
          return null;
        }
      
      })

    );

  }

  /**
   *
   *
   * @readonly
   * @type {Observable<number>}
   * @memberof AuthService
   */
  get accountId(): Observable<number> {

    return this._account.asObservable().pipe(
      
      map(account => {

        if (account) {
          return account.idCuenta;
        } else {
          return null;
        }
      })

    );

  }

  /**
   * Signs up.
   *
   * @param {CreateAccount} account
   * @return {*}  {Observable<any>}
   * @memberof AuthService
   */
  signUp(account: CreateAccount): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/auth/signup`, account);
  }

  /**
   * Login.
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Observable<AuthResponse>}
   * @memberof AuthService
   */
  logIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiURL}/auth/login`, { email: email, password: password }).pipe(tap(this.setAccountData.bind(this)));
  }

  /**
   * Updates an accout.
   *
   * @param {UpdateAccount} account
   * @return {*}  {Observable<any>}
   * @memberof AuthService
   */
  updateAccount(account: UpdateAccount): Observable<any> {
    return this.http.patch<UpdateAccount>(`${environment.apiURL}/auth/account` + account.idUsuario, account);
  }
  
  /**
   * Changes the password.
   *
   * @param {number} idCuenta
   * @param {string} password
   * @return {*}  {Observable<any>}
   * @memberof AuthService
   */
  changePassword(idCuenta: number, password: string): Observable<any> {
    return this.http.patch<{ password: string }>(`${environment.apiURL}/auth/account/changePassword/${idCuenta}`, { password: password });
  }

  /**
   * Deletes an account.
   *
   * @param {number} idUsuario
   * @return {*}  {Observable<any>}
   * @memberof AuthService
   */
  deleteAccount(idUsuario: number): Observable<any>{
    return this.http.delete(`${environment.apiURL}/auth/account/${idUsuario}`);
  }

  /**
   * Stores auth data in localStorage.
   *
   * @private
   * @param {number} idCuenta
   * @param {number} idUsuario
   * @param {string} token
   * @param {string} tokenExpirationDate
   * @param {string} email
   * @param {Rol[]} roles
   * @memberof AuthService
   */
  private storeAuthData(idCuenta: number,
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

  /**
   * Auto login.
   *
   * @return {*}  {Observable<boolean>}
   * @memberof AuthService
   */
  autoLogin(): Observable<boolean> {

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

  /**
   * Gets the stored data.
   *
   * @return {*}  {Promise<any>}
   * @memberof AuthService
   */
  getStoredData(): Promise<any> {

    return new Promise((resolve) => {
      resolve(localStorage.getItem('authData'))
    });

  }

  /**
   * Auto logout.
   *
   * @private
   * @param {number} duration
   * @memberof AuthService
   */
  private autoLogout(duration: number): void{

    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }

    this.activeLogoutTimer = setTimeout(() => {
      this.logOut();
    }, duration);

  }

  /**
   * Log put from Bienes Raices Larios.
   *
   * @memberof AuthService
   */
  logOut(): void{

    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }

    this._account.next(null);
    localStorage.removeItem('authData');
    this.router.navigateByUrl('/');

  }

  /**
   * Sets the account data.
   *
   * @private
   * @param {AuthResponse} accountData
   * @memberof AuthService
   */
  private setAccountData(accountData: AuthResponse): void{

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
