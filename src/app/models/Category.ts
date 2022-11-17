import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
})

export const Category = model('Category', CategorySchema)

