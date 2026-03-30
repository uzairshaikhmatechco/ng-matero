import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export function hasHttpScheme(url: string) {
  return /^https?:\/\//i.test(url);
}

export function baseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const baseUrl = inject(BASE_URL, { optional: true });

  const prependBaseUrl = (url: string) =>
    [baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')].filter(Boolean).join('/');

  // Only prefix URLs that are backend API calls (starting with /api/)
  const shouldPrefix = !hasHttpScheme(req.url) && req.url.startsWith('/api/');

  return shouldPrefix
    ? next(req.clone({ url: prependBaseUrl(req.url) }))
    : next(req);
}
