import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post('/create')
  async createPosts(@Req() req, @Res() res) {
    this.postsService.createPost(req.body);
    res.send('success');
  }
  @Post('/update')
  async updatePosts ( @Req() req, @Res() res ) {
    this.postsService.updatePost(req.body.id, req.body.editQuestions)
    res.send("success")
  }
  @Get('/getPosts')
  async getPosts(@Req() req, @Res() res) {
    let data = await this.postsService.getPosts();
    res.json(data);
  }
  @Get('/:id')
  async getPostsById(@Req() req, @Res() res) {
    let data = await this.postsService.getPostsById(req.params.id);
    res.json(data);
  }
  @Get('/delete/:id')
  async deletePost(@Req() req, @Res() res) {
    await this.postsService.deletePost(req.params.id).then(() => {
      res.send('success');
    });
  }
  @Post('/answers/post')
  async postAnswers(@Req() req, @Res() res) {
    await this.postsService.postAnswers(req.body).then(() => {
      res.send('success');
    });
  }
}
