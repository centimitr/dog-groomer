import {Component, OnInit} from '@angular/core'
import {SessionService} from '../../services/session.service'
import {GotoService} from '../../services/goto.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public session: SessionService, public goto: GotoService) {
  }

  ngOnInit() {
  }

}
