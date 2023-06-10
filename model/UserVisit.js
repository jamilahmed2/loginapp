import mongoose, { Schema } from 'mongoose'

export const userVisitSchema = new mongoose.Schema({
    ipAddress: String,
    location: String,
    timestamp: { type: Date, default: Date.now }
  });
  
//   const UserVisit = mongoose.model('UserVisit', userVisitSchema);

export default mongoose.model("UserVisit", userVisitSchema)