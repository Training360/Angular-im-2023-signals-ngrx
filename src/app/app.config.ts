import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
        FlexLayoutModule,
    ]),
    provideStore(),
    provideEffects()
],
};
