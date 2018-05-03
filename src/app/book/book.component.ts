import {Component, OnInit} from '@angular/core';
import {LoginPhaser} from '../login-phaser';
import {SessionService} from '../session.service';
import {GotoService} from '../goto.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent extends LoginPhaser implements OnInit {

  constructor(public session: SessionService, public goto: GotoService) {
    super();
  }

  ngOnInit() {
  }
}
