import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './gaurd';

@Controller('auth/google')
export class GoogleController {
  constructor() {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request, @Res() res: Response){

  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>){ 
    // res.send("<script>window.close();</script>")
    res.redirect("http://localhost:5000/")
  }
}    
