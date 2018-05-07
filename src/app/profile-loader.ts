import {OnInit} from '@angular/core'
import {Profile, ProfileDog, SessionService} from './session.service'

export class ProfileLoader implements OnInit {

  loaded = false
  profile = new Profile()
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
