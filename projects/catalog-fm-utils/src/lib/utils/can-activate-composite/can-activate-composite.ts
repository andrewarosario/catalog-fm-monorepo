import { Observable, concat } from 'rxjs';
import { takeWhile, toArray, map } from 'rxjs/operators';

export const canActivateComposite = (
  ...canActivate: Observable<boolean>[]
): Observable<boolean> => {
  return concat(...canActivate).pipe(
    takeWhile(Boolean),
    toArray(),
    map((arr) => arr.length === canActivate.length)
  );
};
