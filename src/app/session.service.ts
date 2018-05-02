import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {

  role = 'visitor';

  constructor() {
  }

  isLoggedIn() {
    return this.role !== 'visitor';
  }
}
