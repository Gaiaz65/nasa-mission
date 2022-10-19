import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let apiParams: HttpParams = new HttpParams().append('api_key', environment.api);
    const apiReq = req.clone({
      url: `${req.url}`,
      params: apiParams,
    });

    return next.handle(apiReq);
  }
}

