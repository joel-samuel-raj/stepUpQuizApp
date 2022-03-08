const MongoStore = require( 'connect-mongo' )

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cors from 'cors';
 
async function bootstrap() { 
  const app = await NestFactory.create( AppModule );
  // app.use(cors({
  //   methods:['GET','POST'],
  //   credentials:
  // }))
  
  app.use(cors())
  
  app.use(session({
    store : MongoStore.create({ 
      mongoUrl : process.env.MONGODB_CONNECTION_URL,
      dbName: "example-db",
      stringify: false,
    }),
    secret : process.env.COOKIE_KEY,
    resave : false,
    saveUninitialized : false,
    cookie : { maxAge: 7 * 24 * 60 * 60 * 1000},
    httpOnly : false,
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
