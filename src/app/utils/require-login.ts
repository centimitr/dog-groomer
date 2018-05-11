import {SessionService} from '../services/session.service'
import {GotoService} from '../services/goto.service'

export class RequireLogin {
  constructor(public session: SessionService, public goto: GotoService) {

  }
}
