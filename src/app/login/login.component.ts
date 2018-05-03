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

  submitting = false
  notMatch = false

  constructor(public goto: GotoService, public session: SessionService) {
    super()
  }

  ngOnInit() {
  }

  protected async handleSubmit() {
    await this.session.login(this.account.email, this.account.password)
  }

  async submit() {
    this.submitting = true
    try {
      await this.handleSubmit()
      this.goto.home().then()
    } catch (e) {
      this.resetPhase()
      this.notMatch = true
      this.account.password = null
    }
    this.submitting = false
  }

}
