import * as mongoose from 'mongoose';

export const postsSchema = new mongoose.Schema({
  name: String,
  questions: [ {
    id: String,
    questions: [String]
  }],
});
