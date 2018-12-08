import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// declare ga to typescript
declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {
    // for non-prod envs, capture ga calls and console.log instead
    if (!environment.production) {
      gtag = (...args: any[]) => { console.log(...args); }
    }
  }

  private trackEvent(action: string, label: string): void {
    gtag('event', action, {
      'event_label': label
    });
  }

  trackOutboundLink(label: string): void {
    this.trackEvent('outbound_click', label);
  }
}
