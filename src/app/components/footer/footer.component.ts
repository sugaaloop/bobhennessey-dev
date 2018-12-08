import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socialLinks: any;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.socialLinks = {
      github: 'https://github.com/sugaaloop/bobhennessey-net',
      linkedin: 'https://www.linkedin.com/in/bob-hennessey-1034467',
    }
  }

  trackOutboundClick(url) {
    this.analyticsService.trackOutboundLink(url);
  }

}
