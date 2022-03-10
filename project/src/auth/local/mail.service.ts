import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { sign } from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import { Model } from 'mongoose'
import { User } from './../../../../src/utils/types/user'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, @InjectModel('User') private readonly UserModel: Model<User>) {}

  public async generate(email: string) {
    let jwt = sign( {
      exp: Math.floor( Date.now() / 1000 ) + ( 10 * 60 ),
      data : email
    }, process.env.JWT_RESET_KEY)
    let link = `http://localhost:3000/auth/local/reset/${jwt}`
    console.log('example');
    await this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'joel.20fit18@gct.ac.in', // sender address
        subject: 'Password reset request for Step Up Quiz App', // Subject line
        text: 'welcome', // plaintext body
        html: ` <div> <h1> Password Reset Request </h1> 
        <p> Click this <a href=${link}> link </a> to reset your password. </p> 
          </div>`, // HTML body content
      })
      .then((res) => {console.log("res",res)})
      .catch((err) => {console.error(err)});
  }
  async reset ( jwt ) {
    console.log(jwt_decode(jwt));
    return jwt_decode(jwt) 
  }
}
