import {Phaser} from './phaser'

export class LoginPhaser {

  type = 'login'
  phase = new Phaser()

  account = {
    email: null,
    password: null
  }
}
