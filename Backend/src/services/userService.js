const User = require("../models/user");

const updateVerificationStatus = async (userId, faceMatchScore, fingerprintId) => {
    const isFaceVerified = faceMatchScore > 90;
    const isFingerprintVerified = fingerprintId !== null;

    const isVerified = isFaceVerified && isFingerprintVerified;

    await User.findByIdAndUpdate(userId, {
        verified: isVerified,
        verificationDetails: { faceMatchScore, fingerprintId },
    });
};

module.exports = {
    updateVerificationStatus,
};
