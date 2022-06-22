import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addOpenWeatherKey(request));
  }
  addOpenWeatherKey(request: HttpRequest<any>): HttpRequest<any> {
    let newParams = new HttpParams({fromString: request.params.toString()});
    newParams = newParams.append('appid', 'b166f3f5572f0c211c8245beda46b0e4');
    return request.clone({
      params: newParams
    });
  }
}
