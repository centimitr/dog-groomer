import {Component, OnInit} from '@angular/core'
import {GotoService} from '../../goto.service'
import {LoginPhaser} from '../../login-phaser'
import {SessionService} from '../../session.service'

@Component({
  selector: 'app-register',
  templateUrl: '../login.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends LoginPhaser implements OnInit {

  type = 'register'

  constructor(public goto: GotoService, public session: SessionService) {
    super()
  }

  ngOnInit() {
  }

  async submit() {
    await this.session.register(this.account.email, this.account.password)
    this.goto.home().then()
  }

}
