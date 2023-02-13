import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });

    console.log('get token in interceptor: ' + localStorage.getItem('jwtToken'));
    console.log(req);
    return next.handle(req);
  }
}
