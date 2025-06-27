// src/app/api/gallery/route.ts
import { createServerClient } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Authentication failed' }, 
        { status: 401 }
      );
    }

    // Get request body
    const { name, description, url } = await request.json();

    // Validate required fields
    if (!name || !url) {
      return NextResponse.json(
        { message: 'Name and URL are required' }, 
        { status: 400 }
      );
    }

    // Insert image metadata into database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        name,
        description,
        url,
        user_id: user.id
      });

    if (dbError) {
      console.error('Database error saving gallery image:', dbError);
      return NextResponse.json(
        { message: dbError.message }, 
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in gallery API:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
