import mongoose, { Schema } from 'mongoose'

const commissionSchema = new Schema(
  {
    commissionName: String,
    taux: Number,
  },
  {
    timestamps: true,
  }
)

const Commission =
  mongoose.models.Commission || mongoose.model('Commission', commissionSchema)

export default Commission
