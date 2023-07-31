const mongoose = require("mongoose");
const User = require("./userModel");


const ProfileSchema = new mongoose.Schema(
  {
    lookingFor: {
      type: String,
      enum: ["mentee", "mentor"],
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    phone: {
      type: String, 
      trim: true
    },
    about: [{
      type: String,
      trim: true,
    }],
    location: {
      type: String,
      trim: true,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
    avatar1: {
      type: String,
      default:"",
      
    },
    avatar:{
      type:String,
    },

    yearsOfExperence: {
      type: Number,
    },
    
    expertise: [{
      name: { type: String, trim: true },
      from: { type: Number, max: 2024, min: 1900 },
      to: { type: Number, max: 2024, min: 1900 },
    }],
    currentCompany: {
      type: String,
      trim: true,
    },
    availableForHiring: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    dealtWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    busyDays: [{
      from: { type: Date }, to: { type: Date }
    }]
  },
  { timestamps: true }
);

ProfileSchema.methods.updateRole = async function (mentor) {
  try {
    await User.findByIdAndUpdate(
      mentor.user,
      {
        role: mentor.lookingFor == "mentee" ? "mentor" : "mentee"
      },
      { runValidators: true }
    );
  } catch (e) {
    console.log(e.message);
    throw new Error("cant update role");
  }
}

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
