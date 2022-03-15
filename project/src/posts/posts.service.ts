import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Answer, Post } from './types/Post'

@Injectable()
    
class PostDto {
    questions: [String]
}
    
export class PostsService {
    constructor ( @InjectModel( 'Post' ) private readonly PostModel: Model<Post>, @InjectModel( 'Answer' ) private readonly AnswerModel: Model<Answer> ) { }
    
    async createPost ( object: PostDto ) {
        console.log(object)
        return await new this.PostModel(object).save();
    }
    async updatePost (id, object ) {
        console.log(object)
        let data = await this.PostModel.findByIdAndUpdate( id, {
            $set : {questions : object}
        }, {
            new : true
        });
        console.log(data)
    }
    async getPosts () {
        return await this.PostModel.find({})
    }
    async getPostsById (id) {
        return await this.PostModel.find({_id : id})
    }
    async deletePost (id) {
        return await this.PostModel.findByIdAndDelete(id)
    } 
    async postAnswers ( obj: any ) {
        console.log("here")
        return await new this.AnswerModel(obj).save();
    }
}
