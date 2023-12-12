import mongoose, { Schema } from 'mongoose'

const factureNumberSchema = new Schema({
  factureNumber: {
    type: String,
    required: true,
  },
})

const FactureNumber =
  mongoose.models.FactureNumber ||
  mongoose.model('FactureNumber', factureNumberSchema)

export default FactureNumber
