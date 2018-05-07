import {Component, OnInit} from '@angular/core'
import {SessionService} from '../session.service'
import {GotoService} from '../goto.service'
import {ProfileLoader} from '../profile-loader'
import {Phaser} from '../phaser'
import Any = jasmine.Any

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent extends ProfileLoader implements OnInit {

  phase = new Phaser()
  time = ''
  options = []
  note = ''

  constructor(public session: SessionService, public goto: GotoService) {
    super(session)
  }

  async ngOnInit() {
    super.ngOnInit().then()
  }

  addDog() {
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
    console.log(this.options, this.note)
    alert('wip')
  }
}
