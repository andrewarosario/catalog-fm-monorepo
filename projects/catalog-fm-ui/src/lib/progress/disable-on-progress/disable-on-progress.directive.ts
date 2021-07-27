import { Directive, ElementRef, Inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { PROGRESS_HTTP_ACTIVE } from '../progress-http-active.token';

@UntilDestroy()
@Directive({
  selector: '[uiDisableOnProgress]',
})
export class DisableOnProgressDirective {
  constructor(
    @Inject(PROGRESS_HTTP_ACTIVE) private progress$: Observable<boolean>,
    private elementRef: ElementRef
  ) {
    this.progress$
      .pipe(untilDestroyed(this))
      .subscribe((active) => (this.elementRef.nativeElement.disabled = active));
  }
}
