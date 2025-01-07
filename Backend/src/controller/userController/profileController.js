const User = require('../../model/user');


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

  
  
