const userModel = require("../../model/user")

const deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    const userDetails = await userModel.findById({ userId })
          
    if (!userDetails) {
      return res
      .status(404)
      .json({
        error:
          "User not found or user details missing in DB",
      });
}

    
    const reactivationDate = new Date();
    reactivationDate.setMonth(reactivationDate.getMonth() + 3);

    userDetails.status = "inactive";
    userDetails.deactivationExpiresAt = reactivationDate;

    await userDetails.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_OF_LIBIN,
        pass: process.env.PASSWORD_OF_NODEMAILER,
      },
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                padding: 20px;
                margin: 0;
            }
            .email-content {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
            }
            h1 {
                color: #e63946;
                text-align: center;
            }
            p {
                line-height: 1.6;
                margin: 10px 0;
            }
            .reactivation-date {
                font-weight: bold;
                color: #e63946;
            }
            .cta-button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #e63946;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                text-align: center;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                text-align: center;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="email-content">
            <h1>🔒 Account Temporarily Deactivated</h1>
            <p>Dear ${userDetails.name},</p>
            <p>Your account has been temporarily deactivated and will be reactivated on <span class="reactivation-date">${reactivationDate.toDateString()}</span>.</p>
            <p>We understand you may have questions or concerns, and we’re here to help! 🤝</p>
            <p>If you have any queries, please don’t hesitate to contact our support team. 💌</p>
            <a href="${process.env.FRONTEND_URL}/login" class="cta-button">🌐 Visit Our Website</a>
        </div>
        <div class="footer">
            <p>📩 Need assistance? Contact us at <a href="mailto:support@yourapp.com">support@yourapp.com</a></p>
            <p>🌐 Explore more at <a href="https://yourapp.com">www.yourapp.com</a></p>
        </div>
    </body>
    </html>
    `;
    
    
    const mailOptions = {
      from: `LoveConnect Support" <noreply@luvify.com>`,
      to: userDetails.phoneOrEmail,
      subject: "Account Deactivation Notice",
      text: emailHtml,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(201).json({
        success: true,
        error: false,
        message: `User account deactivated until ${reactivationDate.toDateString()}. 
        Notification sent.`,
      });      
    } catch (error) {
      console.error("Email Error: ", error);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Error sending verification email.",
      });
    }




    } catch (error) {
      console.error('Error in removing user', error.message)
      res.status(500).json({
 error: "Internal Server Error"
      })

    }
}

module.exports=deleteUser