import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
        const token =this.authService.getAuthToken();
        let newHeaders=req.headers;
      if(token){
          newHeaders=newHeaders.set('authorization',token)
          .set('language','en')
         
      }
      const authReq = req.clone({headers:newHeaders});
      return next.handle(authReq);
        // //console.log("interceptor: " + req.url);
     
      
     
  }
}