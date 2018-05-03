export class LoginPhaser {

  type = 'login'
  phase = 0

  account = {
    email: null,
    password: null
  }

  nextPhase() {
    this.phase++
  }

  prevPhase() {
    this.phase--
  }

  is(v) {
    return this.phase === v
  }

  not(v) {
    return !this.is(v)
  }

}
