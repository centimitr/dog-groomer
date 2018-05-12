export class Toggles {

  m = new Map<string, boolean>()

  toggle(id) {
    this.m.set(id, !this.m.get(id))
  }

  active(id) {
    return !!this.m.get(id)
  }
}
