import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {GotoService} from '../../services/goto.service'
import {ProfileLoader} from '../../utils/profile-loader'
import {Phaser} from '../../utils/phaser'
import {Profile, ProfileAppointment} from '../../services/profile'

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

  constructor(public session: SessionService, public goto: GotoService) {
    super(session)
  }

  async ngOnInit() {
    super.ngOnInit().then()
    const doc = this.session.getGroomer()
    doc.valueChanges().subscribe((v: Profile) => {
      if (v) {
        console.log(v)
        this.groomer = v
      }
    })
    this._groomerDoc = doc
  }
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
