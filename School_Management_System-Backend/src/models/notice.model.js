// // models/notice.model.js
// import mongoose from 'mongoose';

// const noticeSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     details: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String, // or Date, but keep string if you're saving formatted date
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Admin',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('Notice', noticeSchema);


import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: String, // or Date if preferred
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);
