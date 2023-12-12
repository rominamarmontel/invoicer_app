import mongoose, { Schema } from 'mongoose'

const paymentSchema = new Schema(
  {
    bankName: String,
    bankCode: String,
    accountNumber: String,
    bic: String,
    iban: String,
    accountName: String,
  },
  {
    timestamps: true,
  }
)
const Payment =
  mongoose.models.Payment || mongoose.model('Payment', paymentSchema)

export default Payment
