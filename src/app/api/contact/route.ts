import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, equipment, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await writeClient.create({
      _type: "contactMessage",
      name,
      email,
      phone: phone || "",
      equipmentInterest: equipment || "Other",
      message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit message. Please try again." },
      { status: 500 }
    );
  }
}
