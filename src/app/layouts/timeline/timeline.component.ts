import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {Profile, ProfileAppointment} from '../../services/profile'
import {Toggles} from '../../utils/toggles'
import {GotoService} from '../../services/goto.service'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  masters = new Map()
  dogs = new Map()
  appointments: ProfileAppointment[]
  reschedules = new Toggles()
  _groomerDoc
  groomer

  constructor(public session: SessionService, public goto: GotoService) {
    const doc = this.session.getGroomer()
    doc.valueChanges().subscribe(async (p: Profile) => {
      await this.updateStore(p.appointments)
      this.appointments = this.filterAps(this.sortAps(p.appointments))
      this.groomer = p
    })
    this._groomerDoc = doc
  }

  ngOnInit() {
  }

  filterAps(aps: ProfileAppointment[]) {
    if (this.session.isClient) {
      return aps = aps.filter(ap => ap.master === this.session.user.uid)
    }
    return aps
  }

  sortAps(aps: ProfileAppointment[]) {
    return aps.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }
      if (a.timeslot < b.timeslot) {
        return 1
      }
      if (a.timeslot > b.timeslot) {
        return -1
      }
      return 0
    })
  }

  async updateStore(aps: ProfileAppointment[]) {
    const uniq = arr => Array.from(new Set(arr))
    const uids = uniq(aps.map(ap => ap.master))
    const dids = uniq(aps.map(ap => ap.dog))
    await Promise.all(uids.map(async (uid: string) => {
      const p = <Profile>await this.session.getProfile(uid)
      this.masters.set(uid, p)
      p.dogs.filter(dog => dids.includes(dog.id))
        .map(dog => this.dogs.set(dog.id, dog))
    }))
  }

  dog(ap: ProfileAppointment) {
    return this.dogs.get(ap.dog)
  }

  master(ap: ProfileAppointment) {
    return this.masters.get(ap.master)
  }

  updateAppointment(id, date, slot) {
    if (confirm('Confirm your re-schedule?')) {
      const p = Object.assign({}, this.groomer)
      p['appointments'] = p['appointments'].map(ap => {
        if (ap.id === id) {
          ap.date = date.toISOString().slice(0, 10)
          ap.timeslot = slot
        }
        return ap
      })
      console.log(p)
      this._groomerDoc.set(p)
      this.reschedules.toggle(id)
    }
  }

  cancelAppointment(id) {
    if (confirm('Confirm your cancellation?')) {
      const p = Object.assign({}, this.groomer)
      p['appointments'] = p['appointments'].filter(ap => ap.id !== id)
      console.log(p)
      this._groomerDoc.set(p)
    }
  }
}
