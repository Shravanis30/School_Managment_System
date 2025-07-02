// models/class.model.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true,},
  subjects: [{ type: String }]
});

export default mongoose.model('Class', classSchema);
