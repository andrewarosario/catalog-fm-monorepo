import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bulk-scrobble-page',
  templateUrl: './bulk-scrobble-page.component.html',
  styleUrls: ['./bulk-scrobble-page.component.less'],
})
export class BulkScrobblePageComponent implements OnInit {
  scrobbleForm = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}
}
