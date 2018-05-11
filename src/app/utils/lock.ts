export class Lock {
  r
  p

  constructor(lock) {
    if (lock) {
      this.lock()
    }
  }

  lock() {
    this.p = new Promise(resolve => this.r = resolve)
  }

  async wait() {
    await this.p
  }

  unlock() {
    this.r()
  }
}
