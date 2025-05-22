'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  publishedDate: string;
}

interface BlogSettings {
  title: string;
  highlightedText: string;
  description: string;
}

export function OurBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<BlogSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest blog posts
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/blog-posts?limit=3&sort=-publishedDate`)
      .then(res => res.json())
      .then(data => setPosts(data.docs || []));

    // Fetch blog settings
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/blog-settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading blog posts...</div>;
  if (!settings) return <div className="text-center py-12">Blog section not configured</div>;

  return (
    <div className="our-blog">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">latest blogs</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                {settings.title} <span>{settings.highlightedText}</span>
              </h2>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="section-title-content wow fadeInUp" data-wow-delay="0.2s">
              <p>{settings.description}</p>
            </div>
          </div>
        </div>

        <div className="row">
          {posts.map((post, index) => (
            <div key={post.id} className="col-lg-4 col-md-6">
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
        </div>
      </div>
    </div>
  );
}