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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSb2JiLkNyaXN0QGdtYWlsLmNvbSIsImV4cCI6MTY2OTc0OTAzMH0.yU_PPCCSaU58QLa6nSX4pvwYo2lgwhWZlE8DLdXHu_WE9X9RZUcEa2YLynV-dTaulmJTNXUmGB7JdeiykO-FLQ",
      },
    })

    return next.handle(request)
  }
}
