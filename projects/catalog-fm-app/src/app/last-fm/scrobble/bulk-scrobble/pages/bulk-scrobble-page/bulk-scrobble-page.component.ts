import { ScrobbleMessage } from '@/last-fm/scrobble/decorators/scrobble-message.decorator';
import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UiMessageService } from 'catalog-fm-ui';
import { Observable } from 'rxjs';
import { BulkScrobbleService } from '../../services/bulk-scrobble/bulk-scrobble.service';

@Component({
  selector: 'app-bulk-scrobble-page',
  templateUrl: './bulk-scrobble-page.component.html',
  styleUrls: ['./bulk-scrobble-page.component.less'],
})
export class BulkScrobblePageComponent {
  scrobbleForm = new FormControl('', Validators.required);

  constructor(
    private bulkScrobbleService: BulkScrobbleService,
    public messageService: UiMessageService
  ) {}

  @ScrobbleMessage()
  scrobble(): Observable<ScrobbleResponseType> {
    return this.bulkScrobbleService.scrobble(this.scrobbleForm.value);
  }
}
