import mongoose, { Schema } from 'mongoose'

const rowSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
    itemPlus: String,
    qty: Number,
    price: Number,
    unit: String,
    total: Number,
  },
  {
    timestamps: true,
  }
)

const Row = mongoose.models.Row || mongoose.model('Row', rowSchema)

export default Row
