import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class GotoService {

  constructor(private router: Router) {
  }

  async goto(...commands) {
    return this.router.navigate(commands);
  }

  home() {
    return this.goto('');
  }

  login() {
    return this.goto('login');
  }

  register() {
    return this.goto('register');
  }

  book() {
    return this.goto('book');
  }

}
