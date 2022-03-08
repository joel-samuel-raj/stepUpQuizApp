import { hash } from 'bcrypt';
import { Controller, Get, Post } from '@nestjs/common';
import { LocalService } from './local.service';
import { Request, Response } from 'express'

@Controller('local')
export class LocalController {
  constructor () { }
  @Get('users')
  async users (req: Request, res: Response) {
    res.send("hello")
  }
  @Post("signin")
  async signIn (req: Request, res: Response) {
    const hashedPassword = await hash( req.body.password, 10 )
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }
    res.send(user)
  }
}
