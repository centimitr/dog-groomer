import {Injectable} from '@angular/core'
import {AngularFirestore} from 'angularfire2/firestore'
import {AngularFireAuth} from 'angularfire2/auth'
import {GotoService} from './goto.service'
import {Lock} from '../utils/lock'
import * as firebase from 'firebase'

import {firestore} from 'firebase'
import {AngularFirestoreDocument} from 'angularfire2/firestore/document/document'
import {AngularFirestoreCollection} from 'angularfire2/firestore/collection/collection'
import {Profile} from './profile'

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
          this.loginLock.lock()
          this.goto.home().then()
          return
        }
        this.user = user;
        (async () => {
          let profile = <Profile>await this.getProfile()
          if (!profile) {
            profile = Profile.create(this.user.uid)
            await this.profile().set(Profile.object(profile))
          }
          this.role = profile.role
          this.loginLock.unlock()
        })()
      }
    })
  }

  getProfile(uid?: string) {
    let resolve
    const p = new Promise(r => resolve = r)
    this.profile(uid).valueChanges().subscribe({next: profile => resolve(profile)})
    return p
  }

  // private async loadAuth() {
  //   let resolve
  //   const p = new Promise(r => resolve = r)
  //   this._auth.authState.subscribe({
  //     next: user => {
  //       if (!user) {
  //         this.role = 'visitor'
  //         // if (this.redirectToLogin) {
  //         //   this.redirectToLogin = false
  //         //   this.goto.login().then()
  //         //   return
  //         // }
  //         this.goto.home().then()
  //         resolve()
  //       }
  //       this.user = user
  //       console.log(this.user)
  //       this.loginLock.unlock()
  //       resolve()
  //     }
  //   })
  //   return p
  // }

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

  get isVisitor() {
    return this.role === 'visitor'
  }

  get isClient() {
    return this.role === 'client'
  }

  get isGroomer() {
    return this.role === 'groomer'
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

  profile(uid?: string) {
    return this.afs.collection('users').doc(uid || this.user.uid)
  }

  getGroomer() {
    const uid = 'YG2FJxVICzRLD50S2K3RWFf8tio2'
    return this.afs.collection('users').doc(uid)
  }

}
