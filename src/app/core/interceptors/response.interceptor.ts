import { Injectable } from '@angular/core';

// prettier-ignore
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { catchError, filter, map, Observable, throwError } from 'rxjs';

// import: local files
import { IApiResponse } from '@core';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(httpRequest)
      .pipe(map((event) => this.formatResponse(event)));
  }

  private formatResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const body = event.body as IApiResponse;
      console.log('ResponseInterceptor: body', body);
      return event.clone({ body: body });
    } else {
      return event;
    }
  }

  // section: custom json parser to handle api response. copied from angular doc.
  // intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
  //   if (httpRequest.responseType === 'json') {
  //     // If the expected response type is JSON then handle it here.
  //     return this.handleJsonResponse(httpRequest, next);
  //   } else {
  //     return next.handle(httpRequest);
  //   }
  // }

  // private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
  //   // Override the responseType to disable the default JSON parsing.
  //   httpRequest = httpRequest.clone({responseType: 'text'});
  //   // Handle the response using the custom parser.
  //   return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
  // }

  // private parseJsonResponse(event: HttpEvent<any>) {
  //   if (event instanceof HttpResponse && typeof event.body === 'string') {
  //     // return event.clone({body: this.jsonParser.parse(event.body)});  // my custom comment
  //     return event.clone({body: JSON.parse(event.body)});
  //   } else {
  //     return event;
  //   }
  // }
}
