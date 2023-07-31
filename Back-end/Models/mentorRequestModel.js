const mongoose = require("mongoose");
const Profile = require('../Models/ProfileModel')

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String, trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String, trim: true,
      required: [true, 'Description is required'],
    },
    helpWith: [{ type: String }],
    requirements: [{ type: String }],
    haveBgWith: [{ type: String }],
    lookingJob: { type: Boolean, default: false },
    location: {
      type: String, trim: true,
      lowercase: true,
      required: [true, 'Location required']
    },
    paid: {
      isPaid: { type: Boolean, default: false },
      amount: { type: Number },
      currency: { type: String, default: "EGP" }
    },
    experience: [{ type: String }],
    duration: {
      type: Number,
      required: [true, 'Duration in days required']
    },
    time: {
      start: { type: Date }, end: { type: Date }
    },
    progress: {
      type: String,
      enum: ["open", "in progress", "close"],
      default: "open"
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
    }]
  },
  { timestamps: true }
);

requestSchema.methods.checkIsClosed = function (request) {
  if (new Date(request.time.end) < new Date()) {
    console.log('closing request ', request.title)
    request.progress = 'close';
    request.save();
  }
}

const Request = mongoose.model("Request", requestSchema);

module.exports = { Request };
