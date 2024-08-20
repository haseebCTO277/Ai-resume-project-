import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import CoverLetter from "@/models/CoverLetter";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    try {
      const coverLetter = await CoverLetter.findOne({ _id: params.id, user: session.user.id });
      if (!coverLetter) {
        return NextResponse.json({ error: "Cover Letter not found" }, { status: 404 });
      }
      return NextResponse.json({ data: coverLetter }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    const body = await req.json();

    try {
      const coverLetter = await CoverLetter.findOne({ _id: params.id, user: session.user.id });

      if (!coverLetter) {
        return NextResponse.json({ error: "Cover Letter not found" }, { status: 404 });
      }

      coverLetter.title = body.title || coverLetter.title;
      coverLetter.content = body.content || coverLetter.content;

      await coverLetter.save();

      return NextResponse.json({ data: coverLetter }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions);
  
    if (session) {
      await connectMongo();
  
      try {
        const coverLetter = await CoverLetter.findOneAndDelete({ _id: params.id, user: session.user.id });
  
        if (!coverLetter) {
          return NextResponse.json({ error: "Cover Letter not found" }, { status: 404 });
        }
  
        return NextResponse.json({ data: "Cover Letter deleted successfully" }, { status: 200 });
      } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
  }