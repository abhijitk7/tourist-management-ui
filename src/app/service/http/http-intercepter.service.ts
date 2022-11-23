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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJJc2FpX0hhcnZleUBnbWFpbC5jb20iLCJleHAiOjE2NjkyMjg5MDd9.mdTQIfbZnqvgyEBVY0Ml3u8gqNTLMFyYeNxfyPmv1GwYL3lscSwxT063ZKfOb6j6dX1Vog3oMrznVaoWTLeDZw",
      },
    })

    return next.handle(request)
  }
}
