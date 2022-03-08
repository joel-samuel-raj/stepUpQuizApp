import { Controller, Get, Req, Res, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor ( private readonly usersService: UsersService ) { }
  @Get()
    // @UseGuards(GoogleAuthGuard) 
    checkUser(@Req() req, @Res() res) {
      // console.log(req)

      if(req.user) {
        // console.log(req.user)
        res.json(req.user)
      }
      else {
        res.json( { data: 'unauthenticated' } )
      }
    }
}
