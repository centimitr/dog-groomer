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
    // make this single selection
    if (this.options.includes(id)) {
      // this.options = this.options.filter(_id => _id !== id)
      this.options = []
    } else {
      // this.options.push(id)
      this.options = [id]
    }
  }

  submit() {
    this.submitting = true
    const appointment = ProfileAppointment.objectFrom(this.profile, this.dog, this.date, this.slot, this.options, this.note)
    if (!this.groomer.appointments) {
      this.groomer.appointments = []
    }
    console.log(this.groomer.appointments)
    this.groomer.appointments.push(appointment)
    this._groomerDoc.set(Profile.object(this.groomer))
    this.submitting = false
    this.phase.next()
  }
}
