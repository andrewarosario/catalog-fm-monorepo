import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent {
  @Input() isCollapsed: boolean;
  @Output() collapse = new EventEmitter<boolean>();
}
