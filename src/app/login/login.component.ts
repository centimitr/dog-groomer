import {Component, OnInit} from '@angular/core'
import {GotoService} from '../goto.service'
import {LoginPhaser} from '../login-phaser'
import {SessionService} from '../session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LoginPhaser implements OnInit {

  constructor(public goto: GotoService, public session: SessionService) {
    super()
  }

  ngOnInit() {
  }

  async submit() {
    await this.session.login(this.account.email, this.account.password)
    this.goto.home().then()
  }

}
