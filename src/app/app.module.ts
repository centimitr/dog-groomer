import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {BookComponent} from './book/book.component';
import {LoginComponent} from './login/login.component';
import {SessionService} from './session.service';
import {TimelineComponent} from './timeline/timeline.component';
import {RegisterComponent} from './register/register.component';
import {GotoService} from './goto.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SessionService, GotoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
