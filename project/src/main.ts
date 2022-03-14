const MongoStore = require( 'connect-mongo' )
const flash = require( 'connect-flash' );

import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module'
 
async function bootstrap() { 
  const app = await NestFactory.create( AppModule );
  app.use(cors({
    methods:['GET','POST'],
    credentials: true,
    origin : "http://localhost:5000"
  }))
  app.use("/auth/google", session({
    name : "google_acc", 
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
  app.use("/auth/local", session({
    name : "local_acc",
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
  app.use("/auth/google",passport.initialize())
  app.use("/auth/local",passport.initialize())
  app.use("/auth/google",passport.session() )
  app.use("/auth/local",passport.session() )
  app.use( flash() )
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
