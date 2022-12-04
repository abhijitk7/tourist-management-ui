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
        Authorization: "Bearer " + this.getAuthToken(),
      },
    })

    return next.handle(request)
  }

  getAuthToken() {
    return localStorage.getItem("token")
  }
}
