import { LocalService } from './local.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly localService: LocalService) {
      super(
          { 
            usernameField: 'email'
        }
    );
  }

  async validate(username: string, password: string): Promise<any> {

    const user = await this.localService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
