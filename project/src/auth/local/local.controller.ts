import { hash } from 'bcrypt';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalService } from './local.service';
import { Request, Response } from 'express';
import { LoginGuard } from './gaurds'
import { MailService } from './mail.service'

@Controller('auth/local')
export class LocalController {
  constructor(private readonly localService: LocalService, private readonly mailService: MailService) {}
  @Post('signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    const hashedPassword = await hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      rollNumber: req.body.rollNumber,
      phoneNumber: req.body.phoneNumber,
      isAdmin: false
    };
    await this.localService.saveUser( user ).then( ( response ) => {
      response ? res.send("User Account exists already !") : res.send("User Account Created Successfully !")
    })
  }
  @Post( 'login' )
  @UseGuards(LoginGuard)
  async login ( @Req() req, @Res() res: Response ): Promise<any> {
    res.send(req.user)
  }
  @Get( 'reset' ) 
  async reset ( @Req() req, @Res() res ) {
    this.mailService.example()
    res.send("wtf")
  }
}
