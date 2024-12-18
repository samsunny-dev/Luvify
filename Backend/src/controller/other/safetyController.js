
const nodemailer = require("nodemailer");
const BlockReport = require("../../model/safetyModel");
const User = require("../../model/userModel"); 


const reportUser = async (req, res) => {
    const { reportedUser, reason } = req.body;
    const reporter = req.user.userId;
    const imageUrls = await uploadToS3(req.files); 

    try {
        if (reporter === reportedUser) {
            return res.status(400).json({ message: "You cannot report yourself" });
        }

        const existingReport = await BlockReport.findOne({ reporter, reportedUser });
        if (existingReport) {
            return res.status(400).json({ message: "You have already reported this user" });
        }

        const [reporterDetails, reportedUserDetails] = await Promise.all([
            User.findById(reporter),
            User.findById(reportedUser),
        ]);

        const newReport = new BlockReport({
            reporter,
            reportedUser,
            reason,
            images:imageUrls,
        });
        await newReport.save();

        // Send email to admin
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_OF_LIBIN,
                pass: process.env.PASSWORD_OF_NODEMAILER,
            },
        });

        const mailOptions = {
            from: `"LoveConnect Support" <noreply@luvify.com>`,
            to: [process.env.EMAIL_OF_LIBIN, process.env.EMAIL_OF_SAM].filter(Boolean).join(","),
            subject: "New User Report",
            html: `
                <h3>New User Report</h3>
                <p><strong>Reporter:</strong> ${reporterDetails.name} (${reporterDetails.email})</p>
                <p><strong>Reported User's Details:</strong> ${reportedUserDetails.name} (${reportedUserDetails.email})</p>
                  <p><strong>Reported User's ID:</strong> ${reportedUserDetails._id}</p>  
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Images:</strong></p>
                <ul>
                    ${images.map((image) => `<li><a href="${image}" target="_blank">${image}</a></li>`).join("")}
                </ul>
                <p><em>This is an automated notification. Please review the report at your earliest convenience.</em></p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Error sending email:", emailError.message);
            return res.status(500).json({
                message: "Report created, but failed to notify admin via email.",
            });
        }

        res.status(201).json({ message: "User reported successfully, admin notified" });
    } catch (error) {
        res.status(500).json({ message: "Error reporting user", error: error.message });
    }
};


const getReport = async (req, res) => {
    try {
        const reports = await BlockReport.find()
            .populate("reporter", "name email") 
            .populate("reportedUser", "name email"); 

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: "No reports found" });
        }

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports", error: error.message });
    }
};

module.exports = { reportUser, getReport };
