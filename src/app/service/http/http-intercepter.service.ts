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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSb2JiLkNyaXN0QGdtYWlsLmNvbSIsImV4cCI6MTY2OTQ4MjM1OX0.yWUhhMtiT09Dt36XdDLQxxcU2By_YmkJeu_MKcqH9Dzefk5hL2RRV7pdLwL6-lrMwFxuA0M7UDm4Nj4azmMw3g",
      },
    })

    return next.handle(request)
  }
}
