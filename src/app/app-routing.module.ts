import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {IndexComponent} from './layouts/index/index.component'
import {BookComponent} from './layouts/book/book.component'
import {LoginComponent} from './layouts/login/login.component'
import {RegisterComponent} from './layouts/login/register/register.component'
import {ProfileComponent} from './layouts/profile/profile.component'
import {ErrorComponent} from './layouts/error/error.component'

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'book', component: BookComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'error', component: ErrorComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
