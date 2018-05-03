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

  isPhase(v) {
    return this.phase === v
  }

  notPhase(v) {
    return !this.isPhase(v)
  }

  resetPhase() {
    this.phase = 0
  }

}
