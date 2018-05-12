import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

@Injectable()
export class GotoService {

  showDog = false

  constructor(private router: Router) {
  }

  async goto(...commands) {
    return this.router.navigate(commands)
  }

  home() {
    return this.goto('')
  }

  login() {
    return this.goto('login')
  }

  register() {
    return this.goto('register')
  }

  book() {
    return this.goto('book')
  }

  toggleDogProfile() {
    this.showDog = !this.showDog
  }

  profile() {
    return this.goto('profile')
  }

  error() {
    return this.goto('error')
  }
}
