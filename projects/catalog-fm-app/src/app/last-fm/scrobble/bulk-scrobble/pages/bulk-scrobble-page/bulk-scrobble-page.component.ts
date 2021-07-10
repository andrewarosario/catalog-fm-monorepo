import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BulkScrobbleService } from '../../services/bulk-scrobble/bulk-scrobble.service';

@Component({
  selector: 'app-bulk-scrobble-page',
  templateUrl: './bulk-scrobble-page.component.html',
  styleUrls: ['./bulk-scrobble-page.component.less'],
})
export class BulkScrobblePageComponent {
  scrobbleForm = new FormControl('', Validators.required);

  constructor(private bulkScrobbleService: BulkScrobbleService) {}

  scrobble(): void {
    this.bulkScrobbleService.scrobble(this.scrobbleForm.value).subscribe();
  }
}
