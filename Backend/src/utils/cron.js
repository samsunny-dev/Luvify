
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const userModel = require("../../model/user");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    const usersToReactivate = await userModel.find({
      status: "inactive",
      deactivationExpiresAt: { $lte: now },
    });

    for (const user of usersToReactivate) {
      user.status = "active";
      user.deactivationExpiresAt = null;
      await user.save();
      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  color: #333333;
                  line-height: 1.6;
                  padding: 20px;
              }
              h1 {
                  color: #e63946;
              }
              a {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #e63946;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  margin-top: 10px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #777777;
              }
          </style>
      </head>
      <body>
          <h1>🎉 Welcome Back, ${user.name}! 🎉</h1>
          <p>We’re so excited to have you back! 🌟 Your account has been successfully reactivated, and we can't wait to see you on the app again.</p>
          <p>To get started, simply click the button below and log in:</p>
          <a href="${process.env.FRONTEND_LOGIN_URL}">🚀 Log In Now!</a>
          <p>💡 *Pro tip*: Make sure to explore our latest features and connect with awesome people waiting to meet you! 💬</p>
          <p>If you have any questions or need help, don’t hesitate to reach out to our friendly support team. We’re here for you, always! ❤️</p>
          <p>Cheers,<br>Your LoveConnect Team 💕</p>
          <div class="footer">
              <p>📩 Need help? Contact us at <a href="mailto:support@loveconnect.com">support@loveconnect.com</a></p>
              <p>🌐 Visit us at <a href="https://loveconnect.com">www.loveconnect.com</a></p>
          </div>
      </body>
      </html>
      `;
      

      await transporter.sendMail({
        from: `LoveConnect Support" <noreply@luvify.com>`,
        to: user.phoneOrEmail,
        subject: "Your Account is Reactivated!",
        html: emailHtml,
      });

      console.log(`Notification sent to: ${user.phoneOrEmail}`);
    }

    console.log("Reactivation process completed.");
  } catch (error) {
    console.error("Error in reactivation process:", error.message);
  }
});
