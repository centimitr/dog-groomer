import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GotoService} from '../goto.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  phase = 0;

  constructor(private goto: GotoService) {
  }

  ngOnInit() {
  }

  submitRegisterInfo() {
    this.goto.home().then();
  }

}
