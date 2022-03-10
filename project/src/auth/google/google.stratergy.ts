import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { config } from 'dotenv'
import { Model } from 'mongoose'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { User } from './../../users/types/interface'

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@InjectModel("User") private readonly UserModel: Model<User>) {
      super({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL,
          scope : ['email', 'profile']
    });
  }
  
  async googleLogin(newUser: { googleId: any; name?: any; email?: any; photo?: any }): Promise<User> { 
    return this.UserModel.findOneAndUpdate(
      {googleId : newUser.googleId},
      {$setOnInsert: newUser},
      { 
        new : true,
        upsert : true,
      }
    ) 
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, displayName, emails, photos } = profile
    const user = {
      googleId : id,
      name: displayName,
      email : emails[0].value,
      profilePicture: photos[ 0 ].value,
      stratergy: "google"
    }
    return this.googleLogin(user).then((user) => { done(null, user) })
    // done(null, user);
  }
 
}