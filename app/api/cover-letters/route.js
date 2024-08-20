import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import CoverLetter from "@/models/CoverLetter";
import Resume from "@/models/Resume";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    const { id } = session.user;

    try {
      const coverLetter = new CoverLetter({
        user: id,
        title: "New Cover Letter", // default value
        content: "",              // default value
      });

      await coverLetter.save();

      return NextResponse.json({ data: coverLetter }, { status: 201 });
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

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    try {
      const coverLetters = await CoverLetter.find({ user: session.user.id });
      const resumes = await Resume.find({ user: session.user.id });

      return NextResponse.json({ data: { coverLetters, resumes } }, { status: 200 });
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
