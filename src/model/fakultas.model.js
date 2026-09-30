import mongoose from 'mongoose'

const fakultasSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

const FakultasModel = mongoose.model('fakultas', fakultasSchema)
export default FakultasModel
