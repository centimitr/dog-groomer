import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-editable-item',
  templateUrl: './editable-item.component.html',
  styleUrls: ['./editable-item.component.css']
})
export class EditableItemComponent implements OnInit {
  _value: string

  @Input() label: string
  @Input() type: string
  @Input() editable: boolean
  @Input() loaded: boolean

  @Input() get value() {
    return this._value
  }

  set value(v: string) {
    this._value = v
    this.valueChange.emit(v)
  }

  @Output() valueChange = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
  }

}
