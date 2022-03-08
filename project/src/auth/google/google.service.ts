import { Model } from 'mongoose';
import { User } from './../../users/types/interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class GoogleService {
    constructor ( @InjectModel( "User" ) private readonly UserModel: Model<User> ) { }
    
    async findById(id: any): Promise<User> {
        return await this.UserModel.findOne({_id : id})
    }
}
