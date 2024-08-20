// /app/api/dashboard/user/[userId]/route.js
import { NextResponse } from 'next/server';
import connectMongo from '../../../../../libs/mongoose';
import User from '../../../../../models/User';

export async function PATCH(request, { params }) {
  try {
    await connectMongo();
    const { userId } = params;
    const updates = await request.json();
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: `Error updating user: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongo();
    const { userId } = params;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User deleted successfully', userId: deletedUser._id });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: `Error deleting user: ${error.message}` }, { status: 500 });
  }
}