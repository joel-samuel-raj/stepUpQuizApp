import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Post } from './types/Post'

@Injectable()
    
class PostDto {
    questions: [String]
}
    
export class PostsService {
    constructor ( @InjectModel( 'Post' ) private readonly PostModel: Model<Post> ) { }
    
    async createPost ( object: PostDto ) {
        console.log(object)
        return await new this.PostModel(object).save();
    }
    async getPosts () {
        return await this.PostModel.find({})
    }
    async deletePost (id) {
        return await this.PostModel.findByIdAndDelete(id)
    }
}
