
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN
}));
app.use(express.json({ limit: "10kb" }));

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, trim: true, default: "" },
  message: { type: String, required: true, trim: true }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid contact details."
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000 ||
      (subject && subject.length > 200)
    ) {
      return res.status(400).json({
        success: false,
        message: "Input is too long."
      });
    }

    // Save message to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: typeof subject === "string"
        ? subject.trim()
        : "",
      message: message.trim()
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject || "N/A"}`,
        "",
        message.trim()
      ].join("\n")
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      id: contact._id
    });
  } catch (error) {
    console.error("Contact API error:", error.message);

    return res.status(500).json({
      success: false,
      message:
        "Your message could not be processed. Please try again."
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend server is running");
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
