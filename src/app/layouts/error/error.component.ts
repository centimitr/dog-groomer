import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {timer} from 'rxjs/observable/timer'
import {flatMap, map, take} from 'rxjs/operators'
import {GotoService} from '../../services/goto.service'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  countDown
  count = 6

  constructor(public session: SessionService, public goto: GotoService) {
  }

  ngOnInit() {
    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => {
        --this.count
        if (this.count === 0) {
          this.goto.login().then()
        }
        return this.count - 1
      })
    )
  }

}
