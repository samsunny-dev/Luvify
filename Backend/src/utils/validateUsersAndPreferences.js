const User = require("../model/user");

const validateUsersAndPreferences = async (swiperId, swipedUserId) => {
  const swiper = await User.findById(swiperId).select("gender preferredGenders");
  const swipedUser = await User.findById(swipedUserId).select("gender preferredGenders");

  if (!swiper || !swipedUser) {
    throw new Error("User not found");
  }

  const isMatch = swipedUser.preferredGenders.includes(swiper.gender) &&
                  swiper.preferredGenders.includes(swipedUser.gender);

  return { swiper, swipedUser, isMatch };
};

module.exports = validateUsersAndPreferences;