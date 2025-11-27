// require("dotenv").config();
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors()); // Allow frontend to send requests

// // Nodemailer Transporter Setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Your App Password
//   },
// });

// // Routes
// app.get("/", (req, res) => {
//   res.send("Absolute Analytics API is running");
// });

// app.post("/api/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required" });
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER, // Sending to yourself
//     replyTo: email, // So you can hit "Reply" in Gmail and it goes to the user
//     subject: `New Contact Form Submission from ${name}`,
//     text: `
//       Name: ${name}
//       Email: ${email}

//       Message:
//       ${message}
//     `,
//     html: `
//       <h3>New Contact Form Submission</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Message:</strong></p>
//       <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Absolute Analytics API (Resend) is running");
});

app.post("/api/contact", async (req, res) => {
  // 1. Updated destructuring to include 'phone' and 'privacyAgreed'
  const { name, email, phone, message, privacyAgreed } = req.body;

  // 2. Updated validation to ensure 'phone' is provided
  if (!name || !email || !phone || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const data = await resend.emails.send({
      // 1. If you haven't verified a domain on Resend yet, YOU MUST USE THIS EMAIL:
      from: "onboarding@resend.dev",

      // 2. Once you verify a domain (e.g., absoluteanalytics.com), change it to:
      // from: "contact@absoluteanalytics.com",

      to: process.env.MY_EMAIL, // This sends the form data to YOU
      reply_to: email, // Allows you to click "Reply" and email the user back
      subject: `New Inquiry from ${name}`,

      // 3. Updated HTML to display the Phone Number and Privacy Status
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #4f46e5;">${phone}</a></p>
            <p style="margin: 5px 0; font-size: 12px; color: #666;"><strong>Privacy Policy Agreed:</strong> ${
              privacyAgreed ? "Yes" : "No"
            }</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; color: #333; white-space: pre-wrap;">
            ${message}
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", data);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
