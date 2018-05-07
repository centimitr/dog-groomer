import {Component} from '@angular/core'
import {Profile, ProfileDog, SessionService} from '../session.service'
import {ProfileLoader} from '../profile-loader'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends ProfileLoader {

  tab = 0
  editable = false
  dogEditable = false

  constructor(public session: SessionService) {
    super(session)
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
