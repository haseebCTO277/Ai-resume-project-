import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectMongo();
    const { id } = session.user;
    try {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ data: user }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectMongo();
    const { id } = session.user;
    const body = await req.json();
    if (!body.email || !body.fullName) {
      return NextResponse.json({ error: "Email and full name are required" }, { status: 400 });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      user.email = body.email;
      user.fullName = body.fullName;
      
      // Update country and language if provided
      if (body.country) {
        user.country = body.country;
      }
      if (body.language) {
        user.language = body.language;
      }

      await user.save();
      return NextResponse.json({ data: user }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}

// Update user's country and language
export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectMongo();
    const { id } = session.user;
    const { country, language } = await req.json();

    if (!country && !language) {
      return NextResponse.json({ error: "Country or language is required" }, { status: 400 });
    }

    try {
      const updateData = {};
      if (country) updateData.country = country;
      if (language) updateData.language = language;

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ data: user }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}