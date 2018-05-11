import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {Profile, ProfileAppointment} from '../../services/profile'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  masters = new Map()
  dogs = new Map()
  appointments: ProfileAppointment[]

  constructor(public session: SessionService) {
    this.session.getGroomer()
      .valueChanges().subscribe(async (p: Profile) => {
      await this.updateStore(p.appointments)
      this.appointments = p.appointments
    })
  }

  ngOnInit() {
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
}
