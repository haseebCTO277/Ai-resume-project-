//Users/mohsinal/airesume-5/app/api/dashboard/resume/[resumeId]/route.js

import { NextResponse } from 'next/server';
import connectMongo from '../../../../../libs/mongoose';
import Resume from '../../../../../models/Resume';

export async function PATCH(request, { params }) {
  try {
    await connectMongo();
    const { resumeId } = params;
    const updates = await request.json();
    const updatedResume = await Resume.findByIdAndUpdate(resumeId, updates, { new: true });
    
    if (!updatedResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Resume updated successfully', resume: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: `Error updating resume: ${error.message}` }, { status: 500 });
  }
}