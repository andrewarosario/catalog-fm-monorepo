import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { canActivateComposite } from './can-activate-composite';

describe('canActivateComposite', () => {
  it('should return true when all params return true', () => {
    const param1 = of(true);
    const param2 = of(true);
    const param3 = of(true);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(true);
    });
  });

  it('should return false when any params return false', () => {
    const param1 = of(true);
    const param2 = of(false);
    const param3 = of(true);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should return false when all params return false', () => {
    const param1 = of(false);
    const param2 = of(false);
    const param3 = of(false);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should return true when all params return true, including boolean param', () => {
    const param1 = of(true);
    const param2 = true;
    const param3 = of(true);
    const param4 = of(true);

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      expect(val).toBe(true);
    });
  });

  it('should return false when boolean params return false', () => {
    const param1 = of(true);
    const param2 = of(true);
    const param3 = of(true);
    const param4 = false;

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should return false when all params return false, including boolean param', () => {
    const param1 = false;
    const param2 = of(false);
    const param3 = of(false);
    const param4 = of(false);

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should return true when all params return true, including promise param', fakeAsync(() => {
    const param1 = of(true);
    const param2 = Promise.resolve(true);
    const param3 = of(true);
    const param4 = of(true);

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      tick();
      expect(val).toBe(true);
    });
  }));

  it('should return false when promise params return false', fakeAsync(() => {
    const param1 = of(true);
    const param2 = of(true);
    const param3 = of(true);
    const param4 = Promise.resolve(false);

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      tick();
      expect(val).toBe(false);
    });
  }));

  it('should return false when all params return false, including promise param', fakeAsync(() => {
    const param1 = Promise.resolve(false);
    const param2 = of(false);
    const param3 = of(false);
    const param4 = of(false);

    canActivateComposite(param1, param2, param3, param4).subscribe((val) => {
      tick();
      expect(val).toBe(false);
    });
  }));

  it('should call all functions when all params return true', () => {
    let count = 0;
    const param1 = of(true).pipe(tap(() => count++));
    const param2 = of(true).pipe(tap(() => count++));
    const param3 = of(true).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(3);
    });
  });

  it('should call function two times when second param return false', () => {
    let count = 0;
    const param1 = of(true).pipe(tap(() => count++));
    const param2 = of(false).pipe(tap(() => count++));
    const param3 = of(true).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(2);
    });
  });

  it('should call function one time when all params return false', () => {
    let count = 0;
    const param1 = of(false).pipe(tap(() => count++));
    const param2 = of(false).pipe(tap(() => count++));
    const param3 = of(false).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(1);
    });
  });
});
