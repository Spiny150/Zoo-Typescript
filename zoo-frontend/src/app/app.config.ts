import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

import { routes } from './app.routes';

const debugInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  console.log('DEBUG INTERCEPTOR: Request URL:', req.url);
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useValue: debugInterceptor, multi: true }, // Debug interceptor
    provideAuth0({
      domain: 'https://dev-xvrd00dllx0ahsel.us.auth0.com', // Remplacez par votre domaine Auth0
      clientId: 'H6QVomuPrDjgrdyhyFNRS164IdtlBGYS', // Remplacez par votre Client ID Auth0
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'http://localhost:3000', // Remplacez par l'audience de votre API NestJS
        scope: 'openid profile email', // Ajoutez les scopes nécessaires
      },
    }),
  ]
};
