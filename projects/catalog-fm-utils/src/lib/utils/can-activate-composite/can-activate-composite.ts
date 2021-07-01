import { Observable, concat, of } from 'rxjs';
import { takeWhile, toArray, map } from 'rxjs/operators';

export const canActivateComposite = (
  ...canActivate: Array<Observable<boolean> | Promise<boolean> | boolean>
): Observable<boolean> => {
  const canActivateAsync = canActivate.map((value) =>
    typeof value === 'boolean' ? of(value) : value
  );

  return concat(...canActivateAsync).pipe(
    takeWhile(Boolean),
    toArray(),
    map((arr) => arr.length === canActivate.length)
  );
};
