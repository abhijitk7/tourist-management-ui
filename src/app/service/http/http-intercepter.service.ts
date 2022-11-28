import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class HttpIntercepterService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSb2JiLkNyaXN0QGdtYWlsLmNvbSIsImV4cCI6MTY2OTY2MDgwNH0.y1ABLE62uN4FzbIjsnNJ2UVbcO9LT1Fnx_I7dcqom1i8EUSeBdwoWQK_g5hsSquQ48D-D9D1IzCYMLu_AJrRGw",
      },
    })

    return next.handle(request)
  }
}
