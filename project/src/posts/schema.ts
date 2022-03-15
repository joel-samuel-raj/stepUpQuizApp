import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export const postsSchema = new mongoose.Schema({
  name: String,
  questions: [String],
});

export const answersSchema = new mongoose.Schema( {
  userId: mongoose.Schema.Types.ObjectId,
  questionId: mongoose.Schema.Types.ObjectId,
  answers: [String]
})
