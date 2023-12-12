import mongoose, { Schema } from 'mongoose'

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: String,
    phone: String,
    email: String,
    website: String,
    siret: String,
    tva: String,
  },
  {
    timeseries: true,
  }
)

const Company =
  mongoose.models.Company || mongoose.model('Company', companySchema)

export default Company
