import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Profile} from '../../services/profile'
import {DatePipe} from '@angular/common'

const mediumDate = function (date: Date) {
  return date.toISOString().slice(0, 10)
}
const second = 1000
const day = 24 * 60 * 60 * second

@Component({
  selector: 'app-slot-selector',
  templateUrl: './slot-selector.component.html',
  styleUrls: ['./slot-selector.component.css']
})
export class SlotSelectorComponent implements OnInit {

  timeSlots = [
    '08:00 - 08:50', '08:50 - 09:40', '09:40 - 10:30', '10:30 - 11:20', '11:20 - 12:10', '12:10 - 13:00',
    '13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:30 - 16:20', '16:20 - 17:10', '17:10 - 18:00',
  ]
  availableTimeSlots = []

  _slot = ''
  _date = new Date()

  @Input() get slot() {
    return this._slot
  }

  set slot(v: string) {
    this._slot = v
    this.slotChange.emit(v)
  }

  @Input() get date() {
    return this._date
  }

  set date(v: Date) {
    this._date = v
    this.dateChange.emit(v)
  }

  @Input() groomer: Profile
  @Output() dateChange = new EventEmitter<Date>()
  @Output() slotChange = new EventEmitter<string>()


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.groomer) {
      this.refreshAvailableTimeSlots()
    }
  }

  refreshAvailableTimeSlots() {
    const sameDate = (mDate, date) => mediumDate(date) === mDate
    if (this.groomer) {
      const curDateAppointments = this.groomer.appointments.filter(ap => sameDate(ap.date, this.date))
      const candidates = Array.from(this.timeSlots)
      const unavailableSlots = curDateAppointments.map(ap => ap.timeslot)
      if (mediumDate(this.date) === mediumDate(new Date())) {
        const dp = new DatePipe('en-US')
        this.timeSlots.forEach(slot => {
          if (dp.transform(new Date(), 'HH:mm') >= slot.slice(0, 5)) {
            unavailableSlots.push(slot)
          }
        })
      }
      this.availableTimeSlots = candidates.filter(can => !unavailableSlots.includes(can))
    }
  }

  invalid() {
    return !this._slot
  }

  canPrevDate() {
    const now = mediumDate(new Date())
    const to = mediumDate(new Date(this.date.getTime()))
    return to <= now
  }

  prevDate() {
    this.date = new Date(this.date.getTime() - day)
    this.refreshAvailableTimeSlots()
  }

  nextDate() {
    this.date = new Date(this.date.getTime() + day)
    this.refreshAvailableTimeSlots()
  }

}
