import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {GotoService} from '../../services/goto.service'
import {ProfileLoader} from '../../utils/profile-loader'
import {Phaser} from '../../utils/phaser'
import {Profile, ProfileAppointment} from '../../services/profile'

// const mediumDate = function (date: Date) {
//   return date.toISOString().slice(0, 10)
// }

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent extends ProfileLoader implements OnInit {

  phase = new Phaser()
  options = []
  slot = ''
  note = ''
  date = new Date()
  submitting = false
  groomer
  _groomerDoc

  // timeSlots = [
  //   '08:00 - 08:50', '08:50 - 09:40', '09:40 - 10:30', '10:30 - 11:20', '11:20 - 12:10', '12:10 - 13:00',
  //   '13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:30 - 16:20', '16:20 - 17:10', '17:10 - 18:00',
  // ]
  // availableTimeSlots = []

  constructor(public session: SessionService, public goto: GotoService) {
    super(session)
  }

  async ngOnInit() {
    super.ngOnInit().then()
    // this.phase.phase = 1
    const doc = this.session.getGroomer()
    doc.valueChanges().subscribe((v: Profile) => {
      if (v) {
        console.log(v)
        this.groomer = v
        // this.refreshAvailableTimeSlots()
      }
    })
    this._groomerDoc = doc
  }

  //
  // refreshAvailableTimeSlots() {
  //   const sameDate = (mDate, date) => mediumDate(date) === mDate
  //   if (this.groomer) {
  //     const curDateAppointments = this.groomer.appointments.filter(ap => sameDate(ap.date, this.date))
  //     const candidates = Array.from(this.timeSlots)
  //     const unavailableSlots = curDateAppointments.map(ap => ap.timeslot)
  //     this.availableTimeSlots = candidates.filter(can => !unavailableSlots.includes(can))
  //   }
  // }

  addDog() {
    this.goto.toggleDogProfile()
    this.goto.profile().then()
  }

  toggleOption(id) {
    if (this.options.includes(id)) {
      this.options = this.options.filter(_id => _id !== id)
    } else {
      this.options.push(id)
    }
  }

  submit() {
    this.submitting = true
    const appointment = ProfileAppointment.objectFrom(this.profile, this.dog, this.date, this.slot, this.options, this.note)
    if (!this.groomer.appointments) {
      this.groomer.appointments = []
    }
    this.groomer.appointments.push(appointment)
    this._groomerDoc.set(Profile.object(this.groomer))
    this.submitting = false
    this.phase.next()
  }
}
