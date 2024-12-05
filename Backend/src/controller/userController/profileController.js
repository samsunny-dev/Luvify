const User = require('../models/User');
const bcrypt = require('bcryptjs');  

exports.createProfile = async (req, res) => {
  try {
    const { name, bio, jobTitle, dateOfBirth, gender, preferredGenders, photos } = req.body;
    
    const user = await User.findOne({ phoneOrEmail: req.user.phoneOrEmail }); 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.profile) {
      return res.status(400).json({ message: "Profile already exists" });
    }
    
    const profileData = {
      name,
      bio,
      jobTitle,
      dateOfBirth,
      gender,
      preferredGenders,
      photos: photos || []
    };
    
    user.profile = profileData;
    await user.save();
    
    return res.status(201).json({ message: "Profile created successfully", profile: profileData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getProfile = async (req, res) => {
    try {

      const user = await User.findOne({ phoneOrEmail: req.user.phoneOrEmail }).select('profile');
      
      if (!user || !user.profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      return res.status(200).json({ profile: user.profile });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

exports.updateProfile = async (req, res) => {
    try {
      const { bio, jobTitle, photos, location, spotifyTopTracks } = req.body;
      
      const user = await User.findOne({ phoneOrEmail: req.user.phoneOrEmail });
      
      if (!user || !user.profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      user.profile.bio = bio || user.profile.bio;
      user.profile.jobTitle = jobTitle || user.profile.jobTitle;
      user.profile.photos = photos || user.profile.photos;
      user.profile.location = location || user.profile.location;
      user.profile.spotifyTopTracks = spotifyTopTracks || user.profile.spotifyTopTracks;
      
      await user.save();
      
      return res.status(200).json({ message: "Profile updated successfully", profile: user.profile });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };

  
  
