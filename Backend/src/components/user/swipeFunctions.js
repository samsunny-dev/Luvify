const Swipe = require("../../model/swipe"); 
const { validateUsersAndPreferences } = require("../../utils/validateUsersAndPreferences"); 

const swipeRight = async (req, res) => {
  const { swiperId, swipedUserId } = req.body;

  try {
    const { isMatch } = await validateUsersAndPreferences(swiperId, swipedUserId);

    if (!isMatch) {
      return res.status(400).json({ error: "Gender preferences do not align" });
    }

    const swipe = new Swipe({
      swiperId,
      swipedUserId,
      swipeType: "right",
    });
    await swipe.save();

    // Check for a mutual swipe
    const mutualSwipe = await Swipe.findOne({
      swiperId: swipedUserId,
      swipedUserId: swiperId,
      swipeType: "right",
    });

    if (mutualSwipe) {
      return res.status(200).json({ message: "It's a match!", match: true, swipedUserId });
    }

    res.status(200).json({ message: "Swipe recorded successfully", match: false });
  } catch (error) {
    console.error("Error processing swipeRight:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const swipeLeft = async (req, res) => {
  const { swiperId, swipedUserId } = req.body;

  try {
    const swipe = new Swipe({
      swiperId,
      swipedUserId,
      swipeType: "left",
    });
    await swipe.save();

    res.status(200).json({ message: "Left swipe recorded successfully", swipedUserId });
  } catch (error) {
    console.error("Error processing swipeLeft:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { swipeRight, swipeLeft };


