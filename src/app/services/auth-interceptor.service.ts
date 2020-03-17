import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(
        user => {
          if ( !user) {
            return next.handle(req);
          }
          let modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
          return next.handle(modifiedReq);
        }
      )
    );
  }


}
