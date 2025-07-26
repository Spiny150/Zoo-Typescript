import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app';
import { provideApi } from './api/provide-api';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideAuth0({
      domain: 'dev-xvrd00dllx0ahsel.us.auth0.com',
      clientId: 'H6QVomuPrDjgrdyhyFNRS164IdtlBGYS',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'http://localhost:3000',
        scope: 'openid profile email',
      },
    }),
    provideApi({ basePath: 'http://localhost:3000' }),
  ],
})
  .catch((err) => console.error(err));
