import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compare } from 'bcrypt'
import { Model, ObjectId } from 'mongoose'
import { User } from './../../users/types/interface'

@Injectable()
export class LocalService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}
  async saveUser(user) {
    let obj =  await this.UserModel.findOneAndUpdate(
      { email: user.email, stratergy: "local" },
      { $setOnInsert: user },
      {
        new: true,
        upsert: true, 
        rawResult : true
      },
    ); 
    return obj.lastErrorObject.updatedExisting 
  }
  async findUser ( email: any ) { 
    return this.UserModel.findOne({ email: email, stratergy: "local" })
  } 
  async validateUser ( email: string, password: string ) {
    let user = await this.UserModel.findOne( { email: email, stratergy: "local" } )
    return await compare( password, user.password ) ?  user : "wrong password"
  }
  async findById ( id: ObjectId ) {
    return this.UserModel.findById(id)
  }
  
} 
