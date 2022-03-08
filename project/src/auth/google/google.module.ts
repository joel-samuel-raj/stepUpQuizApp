import { UserSchema } from './../../users/modal';
import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.stratergy';
import { GoogleSerializer } from './serialization'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

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
