import { InjectionToken, inject } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export const PROGRESS_HTTP_ACTIVE = new InjectionToken<Observable<boolean>>('HTTP In Progress', {
  factory() {
    const progress = inject(NgProgress);
    return progress.ref().state.pipe(pluck('active'));
  },
});
