// import configPromise from '@payload-config'
// import { getPayload } from 'payload'

// export const GET = async () => {
//   const payload = await getPayload({
//     config: configPromise,
//   })

//   const data = await payload.find({
//     collection: 'users',
//   })

//   return Response.json(data)
// }

// Fetch single post by slug

import { NextResponse } from 'next/server';
import payload from 'payload';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          equals: params.slug,
        },
      },
      limit: 1,
    });

    if (!post.docs.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post.docs[0]);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}