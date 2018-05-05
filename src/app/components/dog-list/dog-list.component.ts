import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ProfileDog} from '../../session.service'

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {

  @Input() dogs: ProfileDog[]
  @Input() loaded: boolean
  @Input() selected: ProfileDog
  @Output() selectedChange = new EventEmitter<ProfileDog>()
  @Output() add = new EventEmitter<ProfileDog>()

  constructor() {
  }

  ngOnInit() {
  }

  onClick(dog) {
    if (this.selected !== dog) {
      this.selected = dog
      this.selectedChange.emit(dog)
    } else {
      this.selected = null
      this.selectedChange.emit()
    }
  }

}
