import {Component, OnInit} from '@angular/core'
import {GotoService} from '../../services/goto.service'
import {LoginPhaser} from '../../utils/login-phaser'
import {SessionService} from '../../services/session.service'

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
      await this.goto.home()
    } catch (e) {
      this.phase.reset()
      this.notMatch = true
      this.account.password = null
    }
    this.submitting = false
  }
}
