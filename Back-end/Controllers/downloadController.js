// const fs = require("fs");
// const path = require('path')
// const User = require('../Models/userModel')

// const uploadCV = async (req, res) => {
//   const userId = req.params.id;

//   const cvPath = req.file.path;

//   try {

//     const user = await User.findById(userId);

//     if (!user) {
//       res.status(404).send("User not found");
//       return;
//     }
//     user.cvPath = cvPath;
//     await user.save();

//     res.send("CV uploaded successfully");
//   } catch (error) {
//     console.log("Error uploading CV:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };


// //////////////////////////////////////////////////////////////
// // Controller function to handle CV download
// const downloadcv = async (req, res) => {
//   const menteeName = req.params.name;
//   const userId = req.params.id

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       res.status(404).send("CV not found");
//       return;
//     }
//     console.log("CV Path:", user.cvPath); // Check the value of cvPath

//     if (!user.cvPath) {
//       res.status(404).send("CV not found");
//       return;
//     }
//     res.download(user.cvPath);
//   } catch (error) {
//     console.log("Error retrieving CV:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   uploadCV,
//   downloadcv,
// };

const fs = require("fs");
const path = require('path')
const User = require('../Models/userModel')
const Profile = require('../Models/ProfileModel')

const uploadCV = async (req, res) => {
  const userId = req.params.id;

  const cvPath = req.file.path;

  try {

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    user.cvPath = cvPath;
    await user.save();


    res.send("CV uploaded successfully");
  } catch (error) {
    console.log("Error uploading CV:", error);
    res.status(500).send("Internal Server Error");
  }
};
//////////////////////////////////////////////////////////////////////////

// const uploadAV = async (req, res) => {
//   const profileId = req.params.id;

//   // const avatar = req.file?.path;
//   const avatar = req.file ? req.file.fieldname : "";

//   try {

//     const profile = await Profile.findById(profileId);

//     if (!profile) {
//       res.status(404).send("profile not found");
//       return;
//     }
//     profile.avatar = avatar; 
//     await profile.save();
//   // const userId = req.params.id;

//   // const avatar = req.file?.path;

//   // try {

//   //   const user = await Profile.findById(userId);

//   //   if (!user) {
//   //     res.status(404).send("profile not found");
//   //     return;
//   //   }
//   //   user.avatar = avatar; 
//   //   await user.save();


//     res.send("avatar uploaded successfully");
//   } catch (error) {
//     console.log("Error uploading avatar:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
const uploadAV = async (req, res) => {
  const profileId = req.params.id;

  // Check if a file was uploaded
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }

  const avatarPath = req.file.path;

  try {
    const profile = await Profile.findById(profileId);

    if (!profile) {
      res.status(404).send("Profile not found");
      return;
    }

    profile.avatar = avatarPath;
    await profile.save(); // Save the updated profile with the avatar URL
    res.send({ avatarPath });
  } catch (error) {
    console.log("Error uploading avatar:", error);
    res.status(500).send("Internal Server Error");
  }
};


//////////////////////////////////////////////////////////////
// Controller function to handle CV download
const downloadcv = async (req, res) => {
  const menteeName = req.params.name;

  try {
    const user = await User.findOne({ name: menteeName });

    if (!user) {
      res.status(404).send("CV not found");
      return;
    }
    console.log("CV Path:", user.cvPath); // Check the value of cvPath

    if (!user.cvPath) {
      res.status(404).send("CV not found");
      return;
    }
    res.download(user.cvPath);
  } catch (error) {
    console.log("Error retrieving CV:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  uploadCV,
  downloadcv,
  uploadAV
};