import { Injectable } from '@angular/core';

// prettier-ignore
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// import: local files
import { environment } from '@environments';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${environment.api}/${req.url}` });
    return next.handle(apiReq);
  }

  // constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
  //   return next.handle(apiReq);
  // }

  //   BASE_API_URL can be provided by the application module:

  // providers: [
  //     { provide: "BASE_API_URL", useValue: environment.apiUrl }
  // ]

  // you can define two properties in environment object and provide two values in application module (I assume that different components use either of them so it makes sense to inject whatever is needed in that particular component

  // You don't need to inject BASE_API_URL you can simply access it using environment.apiUrl, this value will change based on your current environment..
}
