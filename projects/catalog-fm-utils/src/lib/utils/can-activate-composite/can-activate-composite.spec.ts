import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { canActivateComposite } from './can-activate-composite';

describe('canActivateComposite', () => {
  it('should return true when all params returns true', () => {
    const param1 = of(true);
    const param2 = of(true);
    const param3 = of(true);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(true);
    });
  });

  it('should return false when any params returns false', () => {
    const param1 = of(true);
    const param2 = of(false);
    const param3 = of(true);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should return false when all params returns false', () => {
    const param1 = of(false);
    const param2 = of(false);
    const param3 = of(false);

    canActivateComposite(param1, param2, param3).subscribe((val) => {
      expect(val).toBe(false);
    });
  });

  it('should call all functions when all params returns true', () => {
    let count = 0;
    const param1 = of(true).pipe(tap(() => count++));
    const param2 = of(true).pipe(tap(() => count++));
    const param3 = of(true).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(3);
    });
  });

  it('should call function two times when second param returns false', () => {
    let count = 0;
    const param1 = of(true).pipe(tap(() => count++));
    const param2 = of(false).pipe(tap(() => count++));
    const param3 = of(true).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(2);
    });
  });

  it('should call function one time when all params returns false', () => {
    let count = 0;
    const param1 = of(false).pipe(tap(() => count++));
    const param2 = of(false).pipe(tap(() => count++));
    const param3 = of(false).pipe(tap(() => count++));

    canActivateComposite(param1, param2, param3).subscribe(() => {
      expect(count).toBe(1);
    });
  });
});
