import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Resume from "@/models/Resume";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongo();

    const { id } = session.user;
    const body = await req.json();

    try {
      const resume = new Resume({
        user: id,
        ...body,
        aiGeneration: {
          keywords: body.aiGeneration?.keywords || "",
          jobDescription: body.aiGeneration?.jobDescription || "",
          tone: body.aiGeneration?.tone || "",
          specificInstructions: body.aiGeneration?.specificInstructions || "",
          atsKeywords: body.aiGeneration?.atsKeywords || "",
          lastGeneratedAt: body.aiGeneration?.lastGeneratedAt || null,
        }
      });

      await resume.save();

      return NextResponse.json({ data: resume }, { status: 201 });
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
      const resumes = await Resume.find({ user: session.user.id });
      return NextResponse.json({ data: resumes }, { status: 200 });
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