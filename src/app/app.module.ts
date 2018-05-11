import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'

import {AppComponent} from './app.component'
import {IndexComponent} from './layouts/index/index.component'
import {BookComponent} from './layouts/book/book.component'
import {LoginComponent} from './layouts/login/login.component'
import {SessionService} from './services/session.service'
import {TimelineComponent} from './layouts/timeline/timeline.component'
import {RegisterComponent} from './layouts/login/register/register.component'
import {GotoService} from './services/goto.service'
import {FormsModule} from '@angular/forms'
import {AngularFireModule} from 'angularfire2'
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore'
import {environment} from '../environments/environment'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {ProfileComponent} from './layouts/profile/profile.component'
import {ErrorComponent} from './layouts/error/error.component'
import {EditableItemComponent} from './components/editable-item/editable-item.component'
import {DogListComponent} from './components/dog-list/dog-list.component'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    ProfileComponent,
    ErrorComponent,
    EditableItemComponent,
    DogListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [SessionService, GotoService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
