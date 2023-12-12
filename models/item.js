import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema(
  {
    itemName: {
      fr: String,
      jp: String,
    },
  },
  {
    timetamps: true,
  }
)

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema)

export default Item
