import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { UserSchema } from './../../users/modal'
import { GoogleController } from './google.controller'
import { GoogleService } from './google.service'
import { GoogleStrategy } from './google.stratergy'
import { GoogleSerializer } from './serialization'

@Module( {
  imports : [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    PassportModule.register({
      session : true
    } )
  ],
  controllers: [GoogleController],
  providers: [ GoogleService, GoogleStrategy, GoogleSerializer],
})
export class GoogleModule {}
