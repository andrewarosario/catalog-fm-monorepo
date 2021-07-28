import { ScrobbleMessage } from '@/last-fm/scrobble/decorators/scrobble-message.decorator';
import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { ScrobbleStrategyService } from '@/last-fm/scrobble/services/scrobble-strategy/scrobble-strategy.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiMessageService } from 'catalog-fm-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manual-scrobble-page',
  templateUrl: './manual-scrobble-page.component.html',
  styleUrls: ['./manual-scrobble-page.component.less'],
})
export class ManualScrobblePageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private scrobbleService: ScrobbleStrategyService,
    public messageService: UiMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  @ScrobbleMessage()
  scrobble(): Observable<ScrobbleResponseType> {
    return this.scrobbleService.scrobble(this.form.value);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      artist: ['', Validators.required],
      track: ['', Validators.required],
      album: [''],
    });
  }
}
