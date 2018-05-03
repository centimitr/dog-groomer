import {Component, OnInit} from '@angular/core'
import {SessionService} from '../session.service'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(public session: SessionService) {
  }

  ngOnInit() {
  }

}
