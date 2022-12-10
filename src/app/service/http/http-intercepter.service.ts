import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AuthenticationService } from "../authentication.service"

@Injectable({
  providedIn: "root",
})
export class HttpIntercepterService implements HttpInterceptor {
  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authenticationService.getAuthToken(),
      },
    })

    return next.handle(request)
  }

}
