import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ProfilePhone} from '../../services/profile'

@Component({
  selector: 'app-editable-item',
  templateUrl: './editable-item.component.html',
  styleUrls: ['./editable-item.component.css']
})
export class EditableItemComponent implements OnInit {
  _value: any

  @Input() label: string
  @Input() type: string
  @Input() editable: boolean
  @Input() loaded: boolean

  @Input() get value() {
    return this._value
  }

  set value(v: any) {
    this._value = v
    this.valueChange.emit(v)
  }

  @Output() valueChange = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
  }

  canAddItem() {
    // return !this.value.filter(v => !v.name || v.number).length
    return true
  }

  addItem() {
    if (this.canAddItem()) {
      this.value.push(new ProfilePhone())
    }
  }

  removeItem(item) {
    this.value = this.value.filter(v => v !== item)
  }

}
