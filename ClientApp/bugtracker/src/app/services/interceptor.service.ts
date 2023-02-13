import {Injectable} from '@angular/core';
import {HttpClient, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHandler} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${environment.apiUrl}${req.url}`
    }); // add base url

    return next.handle(apiReq);
  }
}
