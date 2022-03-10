import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
@Injectable()
export class LocalSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    console.log('deserializeUser');
    done(null, payload);
  }
}
