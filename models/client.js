import mongoose, { Schema } from 'mongoose'

const clientSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    personName: String,
    clientAddress: {
      type: String,
      required: true,
    },
    clientZipcode: {
      type: String,
      required: true,
    },
    clientCity: {
      type: String,
      required: true,
    },
    clientCountry: String,
    clientPhone: String,
    clientEmail: String,
    clientWebsite: String,
    clientSiret: String,
    clientTva: String,
  },
  {
    timestamps: true,
  }
)

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)

export default Client
