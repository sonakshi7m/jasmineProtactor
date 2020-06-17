import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

let users = [{ id: 1, firstName: 'first', lastName: 'last', username: 'test', password: 'test@123' }];

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(payload): Observable<object> {
    const { username, password } = payload;
    const user = users.find(x => x.username === username && x.password === password);
    if (user) {
      return of({ isValid: true }).pipe(delay(3000));
    }
    return throwError('User not found').pipe(delay(3000));
    //return of({ isValid: false }).pipe(delay(3000));

  }

}