import { Injector } from '@angular/core';
import { UiMessageService } from 'catalog-fm-ui';
import { tap } from 'rxjs/operators';

export function ScrobbleMessage() {
  return function (target: any, key: string | symbol, descriptor: any) {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const injector = Injector.create({
        providers: [{ provide: UiMessageService, deps: [] }],
      });
      target.messageService = injector.get(UiMessageService);

      originalFunction
        .apply(this, args)
        .pipe(tap(() => this.messageService.success('The track has been scrobbled!')))
        .subscribe();
    };

    return descriptor;
  };
}
