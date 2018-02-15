import mongoose, { Schema } from 'mongoose';

// Define barcode data schema
/*
var movieSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  poster: String,
  genre: String,
  days: Array,
  times: Array,
});
*/

var barcodeSchema = new Schema({
    site: String,
    name: String,
    email: String,
    feedback: String,
    phoneNum: Number,
    date: { type: Date, default: Date.now },
    severity: Number,
    secure: Boolean,
    urgent: String,
    
});

// Export Mongoose model
export default mongoose.model('barcodeData', barcodeSchema);
