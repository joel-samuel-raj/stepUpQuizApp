import { Injectable } from "@nestjs/common";
import { PassportSerializer } from '@nestjs/passport';
import { ObjectId } from "mongoose";
import { User } from './../../users/types/interface';
import { GoogleService } from "./google.service";

@Injectable()
export class GoogleSerializer extends PassportSerializer {
    constructor(private readonly GoogleService: GoogleService) {
        super();
    }
    serializeUser(user: User, done: Function) {
        done(null, user._id)
    }
    async deserializeUser(id: ObjectId, done: Function) {
        return this.GoogleService.findById(id).then((user) => {
            // console.log("deserialized from session :", user)
            done(null, user)
        })
    }
}   