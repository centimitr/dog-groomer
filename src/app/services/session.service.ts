import {Injectable} from '@angular/core'
import {AngularFirestore} from 'angularfire2/firestore'
import {AngularFireAuth} from 'angularfire2/auth'
import {GotoService} from './goto.service'
import {Lock} from '../utils/lock'
import * as firebase from 'firebase'
import {Profile, ProfileAppointment} from './profile'
import {HttpClient, HttpHeaders} from '@angular/common/http'

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

  constructor(private http: HttpClient, public afs: AngularFirestore, public _auth: AngularFireAuth, public goto: GotoService) {
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
    this.loginLock.lock()
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
    const uid = 'mbvm6wIlZAhjS21pw3eG49WoELl1'
    return this.afs.collection('users').doc(uid)
  }

  sendEmail(masterName, masterAddress, dogName, date, slot, services, note) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      })
    }
    const email = `Hi ${masterName},


You have successfully book an on-site grooming service.


Time: ${date.toISOString().slice(0, 10)} ${slot}

Address: ${masterAddress}

Dog: ${dogName}

Services: ${services.join(', ')}

Note: ${note || '-'}

Check the appointment on https://dog.devbycm.com

The Tom's Grooming Team

`
    return this.http.post<any>('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [{
        to: [{email: this.user.email}]
      }],
      from: {email: 'notification@dog.devbycm.com'},
      subject: `Tom's Grooming - Your Latest Appointment`,
      content: [{
        type: 'text/plain',
        value: email
      }]
    }, httpOptions).toPromise()
  }

}
