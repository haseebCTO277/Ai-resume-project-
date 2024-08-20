// app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import connectMongo from '../../../libs/mongoose';
import User from '../../../models/User';
import Resume from '../../../models/Resume';

export async function GET(request) {
  console.log('Dashboard GET request received');
  
  try {
    await connectMongo();
    console.log('Connected to MongoDB');

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const resumeId = searchParams.get('resumeId');

    console.log('Query params:', { userId, resumeId });

    if (userId) {
      // Fetch resumes for a specific user
      const resumes = await Resume.find({ user: userId }).select('_id fullName professionalTitle createdAt').lean();
      console.log(`Fetched ${resumes.length} resumes for user ${userId}`);
      return NextResponse.json({ resumes });
    } else if (resumeId) {
      // Fetch detailed data for a specific resume
      const resume = await Resume.findById(resumeId).lean();
      console.log(`Fetched resume details for resume ${resumeId}`);
      return NextResponse.json({ resume });
    } else {
      // Fetch all users with joined date, country, and language
      const users = await User.find({}).select('name email hasAccess createdAt country language').lean();
      console.log(`Fetched ${users.length} users`);
      console.log('Sample user data:', users[0]);

      // Fetch all resumes with user information (summary only)
      const resumes = await Resume.find({}).populate('user', 'name email').select('user fullName professionalTitle createdAt').lean();
      console.log(`Fetched ${resumes.length} resumes`);

      return NextResponse.json({ users, resumes });
    }
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: `Error fetching dashboard data: ${error.message}` }, { status: 500 });
  }
}



// PATCH handler for updating user information
export async function PATCH_USER(request) {
    try {
        await connectMongo();
        const { userId } = request.params;
        const updates = await request.json();
        await User.findByIdAndUpdate(userId, updates);
        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: `Error updating user: ${error.message}` }, { status: 500 });
    }
}

// PATCH handler for updating resume information
export async function PATCH_RESUME(request) {
    try {
        await connectMongo();
        const { resumeId } = request.params;
        const updates = await request.json();
        await Resume.findByIdAndUpdate(resumeId, updates);
        return NextResponse.json({ message: 'Resume updated successfully' });
    } catch (error) {
        console.error('Error updating resume:', error);
        return NextResponse.json({ error: `Error updating resume: ${error.message}` }, { status: 500 });
    }
}