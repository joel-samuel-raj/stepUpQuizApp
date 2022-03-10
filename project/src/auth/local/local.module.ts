import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { UserSchema } from './../../users/modal'
import { LocalController } from './local.controller'
import { LocalService } from './local.service'
import { LocalStrategy } from './local.stratergy'
import { MailService } from './mail.service'
import { LocalSerializer } from './serializer'

@Module( {
  imports : [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    PassportModule.register({
      session : true
    } ),
    MailerModule.forRoot( {
      transport: {
        host: 'localhost',
        port: 8080,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: "joel.20fit18@gct.ac.in",
          pass: "gct@1234"
        },
        service: "gmail",
      },
      preview: true,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    })
  ],
  controllers: [LocalController],
  providers: [LocalService, LocalSerializer, LocalStrategy, MailService]
})
export class LocalModule {}
