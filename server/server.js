
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
  })
);

app.use(express.json({ limit: "10kb" }));

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      trim: true,
      default: ""
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Health Check API
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio backend is running"
  });
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Input validation
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

    // Length validation
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

    // Save contact message in MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject:
        typeof subject === "string"
          ? subject.trim()
          : "",
      message: message.trim()
    });

    console.log("Contact saved in MongoDB:", contact._id);

    // Send email notification without blocking response
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    transporter
      .sendMail({
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
      })
      .then(() => {
        console.log("Email notification sent successfully.");
      })
      .catch((error) => {
        console.error(
          "Email notification failed:",
          error.message
        );
      });

    // Return success after MongoDB save
    return res.status(201).json({
      success: true,
      message: "Your message has been saved successfully!",
      id: contact._id
    });

  } catch (error) {
    console.error("Contact API error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Your message could not be saved. Please try again."
    });
  }
});

// Start Server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error(
      "Backend startup failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();
