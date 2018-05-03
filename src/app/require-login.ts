import {SessionService} from './session.service'
import {GotoService} from './goto.service'

export class RequireLogin {
  constructor(public session: SessionService, public goto: GotoService) {

  }
}
