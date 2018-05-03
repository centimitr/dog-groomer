import {Injectable} from '@angular/core'
import {AngularFirestore} from 'angularfire2/firestore'
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase'
import {GotoService} from './goto.service'

@Injectable()
export class SessionService {

  role = null
  user = {}
  dogs = []

  constructor(public db: AngularFirestore, public auth: AngularFireAuth, public goto: GotoService) {
    auth.authState.subscribe({
      next: user => {
        if (!user) {
          this.role = 'visitor'
          this.goto.home().then()
          return
        }
        this.role = 'client'
        this.user = user
      }
    })
  }

  isLoggedIn() {
    return ['client', 'groomer'].includes(this.role)
  }

  async logout() {
    await this.auth.auth.signOut()
  }

  async login(email, password) {
    const res = await this.auth.auth.signInWithEmailAndPassword(email, password)
    console.log(res)
  }

  async register(email, password) {
    const res = await this.auth.auth.createUserWithEmailAndPassword(email, password)
  }

}
