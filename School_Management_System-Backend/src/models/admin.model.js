// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   schoolName: { type: String, required: true },  
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'admin' },
//   designation: { type: String, default: 'Principal' },
//   profileImage: { type: String, default: '' }
// }, { timestamps: true });

// export default mongoose.model("Admin", adminSchema);



import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  designation: { type: String, default: 'Principal' },
  profileImage: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
