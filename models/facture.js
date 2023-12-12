import mongoose, { Schema } from 'mongoose'

const factureSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    factureDate: {
      type: String,
      required: true,
    },
    factureNumber: {
      type: String,
      required: true,
    },
    conditionPayment: {
      type: Number,
      enum: [10, 20, 30, 60, 90],
    },
    paymentDue: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      enum: ['preparation', 'reperage', 'tournage'],
      default: 'preparation',
    },
    rows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Row',
        required: true,
      },
    ],
    note: String,
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    commission: {
      type: Schema.Types.ObjectId,
      ref: 'Commission',
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
)
const Facture =
  mongoose.models.Facture || mongoose.model('Facture', factureSchema)

export default Facture
