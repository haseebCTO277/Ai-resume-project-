// File: /app/api/dashboard/config/route.js

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'config.js');
    const configContent = await fs.readFile(configPath, 'utf8');
    return NextResponse.json({ content: configContent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config file' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { content } = await request.json();
    const configPath = path.join(process.cwd(), 'config.js');
    await fs.writeFile(configPath, content);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config file' }, { status: 500 });
  }
}