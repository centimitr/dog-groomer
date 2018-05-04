import {Component, OnInit} from '@angular/core'
import {SessionService} from '../session.service'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  items = [{
    kind: 'Alaska',
    date: 'Friday, 4 May 2018',
    timeSlot: '14:00 - 18:00',
    services: [
      'normal groom',
      'normal groom',
      'normal groom',
      'normal groom'
    ]
  }]

  constructor(public session: SessionService) {
  }

  ngOnInit() {
  }

}
