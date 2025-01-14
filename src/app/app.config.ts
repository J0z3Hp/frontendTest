import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptor/auth.interceptor'; 

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient( withInterceptors([ authInterceptor ])),      
    provideToastr({ 
      timeOut: 2000, 
      positionClass: "toast-bottom-left", 
      preventDuplicates: true, 
      easeTime: 0, 
      progressBar: false,
    }),
    provideAnimations(),
  ]
};
