import { ScrobbleService } from '@/last-fm/scrobble/services/scrobble/scrobble.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manual-scrobble-page',
  templateUrl: './manual-scrobble-page.component.html',
  styleUrls: ['./manual-scrobble-page.component.less'],
})
export class ManualScrobblePageComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private scrobbleService: ScrobbleService) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  scrobble(): void {
    this.scrobbleService.scrobble(this.form.value).subscribe();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      artist: ['', Validators.required],
      track: ['', Validators.required],
      album: [''],
    });
  }
}
