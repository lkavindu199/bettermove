import { Pagination } from '@/components/Pagination';
import { getPayloadClient } from '@/get-payload';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number; 
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  publishedDate: string;
}

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const payload = await getPayloadClient();
  
  const { docs: posts, totalPages } = await payload.find({
    collection: 'blog-posts',
    limit: 6,
    page,
    sort: '-publishedDate',
  });

  return (
    <div className="page-blog">
      <div className="container">
        <div className="row">
          {posts.map((post: BlogPost, index: number) => (
            <div key={post.slug} className="col-lg-4 col-md-6">
              <div 
                className="post-item wow fadeInUp" 
                data-wow-delay={`${0.2 * index}s`}
              >
                <div className="post-featured-image">
                  <Link href={`/blog/${post.slug}`} data-cursor-text="View">
                    <figure className="image-anime">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        width={400}
                        height={300}
                        style={{ objectFit: 'cover' }}
                      />
                    </figure>
                  </Link>
                </div>

                <div className="post-item-body">
                  <div className="post-item-content">
                    <h3>
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p>{post.excerpt}</p>
                  </div>

                  <div className="post-item-btn">
                    <Link href={`/blog/${post.slug}`} className="readmore-btn">
                      read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/blog"
              className="page-pagination wow fadeInUp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}