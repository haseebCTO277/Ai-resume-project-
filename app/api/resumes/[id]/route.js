import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Resume from "@/models/Resume";
import User from "@/models/User";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    try {
      const user = await User.findById(session.user.id);
      
      // Check if the user is an admin
      const isAdmin = user.role === 'admin';

      let resume;
      if (isAdmin) {
        // If admin, allow fetching any resume
        resume = await Resume.findById(params.id);
      } else {
        // If not admin, only allow fetching own resume
        resume = await Resume.findOne({ _id: params.id, user: session.user.id });
      }

      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }
      return NextResponse.json({ data: resume }, { status: 200 });
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
    const user = await User.findById(session.user.id);
    const isAdmin = user.role === 'admin';

    const body = await req.json();

    try {
      let updatedResume;
      if (isAdmin) {
        updatedResume = await Resume.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true });
      } else {
        updatedResume = await Resume.findOneAndUpdate(
          { _id: params.id, user: session.user.id },
          { $set: body },
          { new: true, runValidators: true }
        );
      }

      if (!updatedResume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }

      return NextResponse.json({ data: updatedResume }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Something went wrong", details: e.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();
    const user = await User.findById(session.user.id);
    const isAdmin = user.role === 'admin';

    try {
      let resume;
      if (isAdmin) {
        resume = await Resume.findByIdAndDelete(params.id);
      } else {
        resume = await Resume.findOneAndDelete({ _id: params.id, user: session.user.id });
      }

      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }

      return NextResponse.json({ data: "Resume deleted successfully" }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}