import {OnInit} from '@angular/core'
import {SessionService} from '../services/session.service'
import {Profile, ProfileDog} from '../services/profile'

export class ProfileLoader implements OnInit {

  loaded = false
  profile: Profile = new Profile()
  dog: ProfileDog
  protected _doc

  constructor(protected session: SessionService) {
  }

  async ngOnInit() {
    await this.session.wait()
    const doc = this.session.profile()
    doc.valueChanges().subscribe((v: Profile) => {
      if (v) {
        this.profile = v
        this.loaded = true
      }
    })
    this._doc = doc
  }

}
