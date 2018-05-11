import {Component, OnInit} from '@angular/core'
import {LoginComponent} from '../login.component'

@Component({
  selector: 'app-register',
  templateUrl: '../login.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends LoginComponent implements OnInit {

  type = 'register'

  ngOnInit() {
  }

  async handleSubmit() {
    await this.session.register(this.account.email, this.account.password)
  }

}
