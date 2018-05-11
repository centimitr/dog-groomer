export class Phaser {

  phase = 0

  next() {
    this.phase++
  }

  prev() {
    this.phase--
  }

  is(v) {
    return this.phase === v
  }

  not(v) {
    return !this.is(v)
  }

  reset() {
    this.phase = 0
  }

}
