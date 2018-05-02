import {Component, OnInit} from '@angular/core';
import {GotoService} from '../goto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phase = 0;

  constructor(private goto: GotoService) {
  }

  ngOnInit() {
  }

  submitLoginInfo() {
    this.goto.home().then();
  }

}
