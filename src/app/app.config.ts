import { LOCALE_ID } from '@angular/core';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './shared/intl/spanish-paginator';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, 
    { provide: MatPaginatorIntl, useFactory: getSpanishPaginatorIntl }, 
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
