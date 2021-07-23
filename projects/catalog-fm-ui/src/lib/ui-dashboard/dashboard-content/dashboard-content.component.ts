import { Component } from '@angular/core';

@Component({
  selector: 'ui-dashboard-content',
  template: `
    <nz-content>
      <div class="inner-content">
          <ng-content></ng-content>
      </div>
    </nz-content>
  `,
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent { }
