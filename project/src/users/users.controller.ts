import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor ( private readonly usersService: UsersService ) { }
  @Get("auth/:strategy/users")
    checkLocalUser(@Req() req, @Res() res) {
      if(req.user) {
        res.json(req.user)
      }
      else {
        res.json({})
      }
  }
  @Get("auth/:strategy/logout")
    logoutGoogleUser(@Req() req, @Res() res) {
      if(req.user) {
        req.logout()
        res.send("logged out")
      }
      else {
        console.log(req.params)
        res.send("unauthenticated")
      }
    }
}
