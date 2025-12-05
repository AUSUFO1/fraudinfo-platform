export const runtime = "nodejs"; 

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, link, description } = body;

    if (!name || !email || !link || !description) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate env variables
    if (!process.env.FRAUDINFO_EMAIL || !process.env.FRAUDINFO_EMAIL_PASS) {
      console.error("Missing email environment variables.");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    // Setup transporter (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Gmail requires secure SMTP port 465
      auth: {
        user: process.env.FRAUDINFO_EMAIL,
        pass: process.env.FRAUDINFO_EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"FraudInfo Submission Bot" <${process.env.FRAUDINFO_EMAIL}>`,
      to: process.env.FRAUDINFO_EMAIL,
      subject: "New Fraud Resource Submission",
      html: `
        <h2>New Resource Contribution</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Resource Link:</strong> ${link}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email submission failed:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
