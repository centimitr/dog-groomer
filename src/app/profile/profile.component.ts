import {Component, OnInit} from '@angular/core'
import {Profile, ProfileDog, SessionService} from '../session.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab = 0
  editable = false
  dogEditable = false
  loaded = false
  profile = new Profile()
  dog: ProfileDog
  private _doc

  constructor(public session: SessionService) {
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

  updateProfile() {
    try {
      const data = Profile.object(this.profile)
      console.log(data)
      this._doc.set(data)
    } catch (e) {
      console.warn(e)
    }
  }

  editOrUpdate() {
    if (!this.editable) {
      this.editable = true
      return
    }
    this.editable = false
    this.updateProfile()
  }

  addDog() {
    const dog = new ProfileDog()
    this.profile.dogs.push(dog)
    this.dog = dog
    this.dogEditable = true
  }

  editOrUpdateDog() {
    if (!this.dogEditable) {
      this.dogEditable = true
      return
    }
    this.dogEditable = false
    this.updateProfile()
  }

  removeDog() {
    if (window.confirm(`Are you sure to remove dog: ${this.dog.name}?`)) {
      this.dogEditable = false
      this.profile.dogs = this.profile.dogs.filter(dog => dog !== this.dog)
      this.dog = null
    }
  }
}
