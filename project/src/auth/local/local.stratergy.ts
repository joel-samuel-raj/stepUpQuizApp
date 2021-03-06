import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LocalService } from './local.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly localService: LocalService) {
      super(
          { 
          usernameField: 'email',
            passwordField: 'password'
        }
    );
  } 

  async validate(username: string, password: string): Promise<any> {

    const user = await this.localService.validateUser( username, password );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
