import mongoose from 'mongoose'
export interface Post {
    name : String
    questions: [String]
}

export interface Answer {
    userId: mongoose.Schema.Types.ObjectId,
    questionId: mongoose.Schema.Types.ObjectId,
    answers: [String]
}