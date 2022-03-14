import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor ( private readonly postsService: PostsService ) { }
  @Post( "/create" )
  async createPosts ( @Req() req, @Res() res ) {
    this.postsService.createPost( req.body )
    res.send("success")
  }
  @Get( "/getPosts" )
  async getPosts ( @Req() req, @Res() res ) {
    let data = await this.postsService.getPosts()
    res.json(data)
  }
  @Get( "/delete/:id" )
  async deletePost ( @Req() req, @Res() res ) {
    await this.postsService.deletePost( req.params.id ).then( () => {
      res.send("success")
    })
  }
}
