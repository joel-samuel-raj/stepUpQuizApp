import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async example() {
    console.log('example');
    await this.mailerService
      .sendMail({
        to: 'joel.sr1024@gmail.com', // list of receivers
        from: 'joel.20fit18@gct.ac.in', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((res) => {console.log("res",res)})
      .catch((err) => {console.error(err)});
  }
}
