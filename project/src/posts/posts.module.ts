import { answersSchema, postsSchema } from './schema';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose'

@Module( {
  imports : [MongooseModule.forFeature([{ name: "Post", schema: postsSchema }, { name: "Answer", schema: answersSchema }])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
