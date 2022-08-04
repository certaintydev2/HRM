import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private http: HttpClient, private router: Router) { }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem("auth")) {
      const tokenKey: any = localStorage.getItem("auth");
      request = request.clone({
        setHeaders: {
          'auth': tokenKey,
        }
      })
    }
    this.router.events.subscribe((event) => {
      if(localStorage.getItem('auth')){
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url
          if(currentUrl === '/login'){
            this.router.navigate(['/pages/dashboard']);
          }
        }
        }
    });
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.body.status == 403 || event.body.status == 401) {
              localStorage.removeItem('auth');
              var url: string[] = ['/login']
              this.router.navigate(url)
            }
          }
        },
        error => {
          console.log("api error :", error);
          if (error.status = 401) {
            localStorage.removeItem('auth');
            var url: string[] = ['/login']
            this.router.navigate(url)
          }
        }
      )
    );
  }
}
