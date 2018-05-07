import {Injectable} from '@angular/core'
import {AngularFirestore} from 'angularfire2/firestore'
import {AngularFireAuth} from 'angularfire2/auth'
import {GotoService} from './goto.service'
import {Lock} from './lock'
import * as firebase from 'firebase'
import {firestore} from 'firebase'
import {AngularFirestoreDocument} from 'angularfire2/firestore/document/document'

@Injectable()
export class SessionService {

  role
  user: firebase.UserInfo
  loginLock = new Lock(true)
  menu = [{
    kind: 'wash',
    options: [{
      id: 'g0',
      name: 'wash only'
    }, {
      id: 'g1',
      name: 'wash and nail clipping'
    }, {
      id: 'g4',
      name: 'deluxe grooming'
    }]
  }, {
    kind: 'hair style',
    options: [{
      id: '00',
      name: 'short hairstyles'
    }, {
      id: '01',
      name: 'medium hairstyles'
    }, {
      id: '02',
      name: 'long hairstyles'
    }, {
      id: '03',
      name: 'undo & burn hairstyles'
    }, {
      id: '04',
      name: 'braid hairstyles'
    }]
  }]

  // redirectToLogin = false

  constructor(public afs: AngularFirestore, public _auth: AngularFireAuth, public goto: GotoService) {
    this._auth.authState.subscribe({
      next: user => {
        if (!user) {
          this.role = 'visitor'
          // if (this.redirectToLogin) {
          //   this.redirectToLogin = false
          //   this.goto.login().then()
          //   return
          // }
          this.goto.home().then()
          return
        }
        this.role = 'client'
        this.user = user
        console.log(this.user)
        console.log(0)
        this.loginLock.unlock()
      }
    })
  }

  async requireLogin() {
    await this.loginLock.wait()
    if (this.isLoggedIn()) {
      return
    }
    // if (this.role === null) {
    //   this.redirectToLogin = true
    // } else {
    this.goto.error().then()
    // }
  }

  isLoggedIn() {
    return ['client', 'groomer'].includes(this.role)
  }

  async logout() {
    await this._auth.auth.signOut()
  }

  async login(email, password) {
    await this._auth.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email, password) {
    await this._auth.auth.createUserWithEmailAndPassword(email, password)
  }

  async wait() {
    await this.loginLock.wait()
  }

  profile() {
    // IvyX6cxzl6QTkfvthMlA
    return this.afs.collection('users').doc(this.user.uid)
  }

}


export class Profile {
  fullname = ''
  nickname = ''
  address = ''
  phones: ProfilePhone[] = []
  dogs: ProfileDog[] = []

  static object(p: Profile) {
    const o = Object.assign({}, p)
    o.phones = p.phones.map(item => Object.assign({}, item))
    o.dogs = p.dogs.map(item => Object.assign({}, item))
    return o
  }
}


export class ProfileDog {
  name = ''
  breed = ''
  dob = ''
}

export class ProfilePhone {
  name = ''
  number = ''
}
