import {Component} from '@angular/core';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import {GotoService} from './goto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    {href: '/', text: 'Index'},
    {href: '/register', text: 'Form - Register'},
    {href: '/login', text: 'Form - Login - email, password'},
    // {href: '/', text: 'User Dashboard'},
    {href: '/info', text: 'Form - Edit User Information - name, home address, multiple contact phone numbers, dog name, breed, dob'},
    {href: '/book', text: 'Form - Make an appointment - select dog, select time (90 min), groom options, note'},
    {href: '/', text: 'List - Appointment History - cancel, re-schedule'},
    // {href: '/', text: 'Groomer Dashboard'},
    {href: '/', text: 'List - Schedule'},
    {href: '/', text: 'Feature - Email notification'},
  ];

  constructor(private session: SessionService, private goto: GotoService) {
  }
}
