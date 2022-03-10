import { Document } from 'mongoose'

export interface User extends Document {
    readonly name?: string
    readonly email?: string
    readonly profilePicture?: string
    readonly isAdmin?: boolean
    readonly googleId?: string
    readonly password?: string
    readonly rollNumber?: number
    readonly phoneNumber?: number
    readonly stratergy?: string
}