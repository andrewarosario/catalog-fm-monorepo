import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
})
export class DashboardMenuComponent implements OnInit {
  @Input() isCollapsed: boolean;
  constructor() {}

  ngOnInit(): void {}
}
