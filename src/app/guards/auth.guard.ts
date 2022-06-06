import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../services/auth.service';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  /**
   * Creates an instance of AuthGuard.
   * 
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof AuthGuard
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * CanLoad guard method.
   *
   * @param {Route} route
   * @param {UrlSegment[]} segments
   * @return {*}  {(Observable<boolean> | Promise<boolean> | boolean)}
   * @memberof AuthGuard
   */
  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAuthenticated.pipe(take(1),

      switchMap(isAuthenticated => {

        if (!isAuthenticated) {
          return this.authService.autoLogin();
        } else {
          return of(isAuthenticated);
        }
        
      }),

      tap(isAuthenticated => {

        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        }

      })

    );
    
  }

}


