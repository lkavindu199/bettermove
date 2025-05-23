import { getPayloadClient } from '@/get-payload'
import { RichText } from '@/components/RichText'
import Image from 'next/image'
import { notFound as throwNotFound } from 'next/navigation'

interface BlogPost {
  id: number
  slug: string
  title: string
  featuredImage: {
    url: string
    alt?: string
  }
  publishedDate: string
    content: {
    root: {
      children: any[]
      type: string
      version: number
    }
  }
  author?: {
    name: string
    position: string
  }
  tags?: {
    tag: string
  }[]
  socialLinks?: {
    platform: 'facebook' | 'linkedin' | 'instagram' | 'twitter'
    url: string
  }[]
  meta?: {
    title?: string
    description?: string
    keywords?: string
  }
  excerpt?: string
}
interface BlogSettings {
  title: string
  highlightedText: string
  description: string
  image: {
    url: string
    alt?: string
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const payload = await getPayloadClient()

  try {
    const [post, settings] = await Promise.all([
      payload.find({
        collection: 'blog-posts',
        where: {
          slug: {
            equals: params.slug,
          },
        },
        limit: 1,
      }) as Promise<{ docs: BlogPost[] }>,
      payload.findGlobal({
        slug: 'blog-settings',
      }) as Promise<BlogSettings>
    ])

    const blogPost = post.docs[0]

   if (!blogPost) throwNotFound()

    return (
      <>
        {/* Page Header Start */}
        <div className="page-header parallaxie">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                {/* Page Header Box Start */}
                <div className="page-header-box">
                  <h1 className="text-anime-style-2" data-cursor="-opaque">
                    {blogPost.title}
                  </h1>
                  <div className="post-single-meta wow fadeInUp">
                    <ol className="breadcrumb">
                      {blogPost.author && (
                        <li>
                          <i className="fa-regular fa-user"></i> {blogPost.author.name}
                        </li>
                      )}
                      {blogPost.publishedDate && (
                        <li>
                          <i className="fa-regular fa-clock"></i>{' '}
                          {new Date(blogPost.publishedDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
                {/* Page Header Box End */}
              </div>
            </div>
          </div>
          {/* Background Image from Blog Settings */}
          {settings?.image?.url && (
            <div className="header-background-image">
              <Image
                src={settings.image.url}
                alt={settings.image.alt || 'Blog header background'}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
        </div>
        {/* Page Header End */}

        {/* Page Single Post Start */}
        <div className="page-single-post">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* Post Featured Image Start */}
                <div className="post-image">
                  <figure className="image-anime reveal">
                    <Image
                      src={blogPost.featuredImage.url}
                      alt={blogPost.featuredImage.alt || blogPost.title}
                      width={1200}
                      height={630}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                </div>
                {/* Post Featured Image Start */}

                {/* Post Single Content Start */}
                <div className="post-content">
                  {/* Post Entry Start */}
                  <div className="post-entry">
                    <RichText content={blogPost.content} />
                  </div>
                  {/* Post Entry End */}

                  {/* Post Tag Links Start */}
                  <div className="post-tag-links">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        {/* Post Tags Start */}
                        {blogPost.tags && blogPost.tags.length > 0 && (
                          <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                            <span className="tag-links">
                              Tags:
                              {blogPost.tags.map((tag, index) => (
                                <a key={index} href={`/blog/tag/${tag.tag}`}>
                                  {tag.tag}
                                </a>
                              ))}
                            </span>
                          </div>
                        )}
                        {/* Post Tags End */}
                      </div>

                      <div className="col-lg-4">
                        {/* Post Social Links Start */}
                        <div className="post-social-sharing wow fadeInUp" data-wow-delay="0.5s">
                          <ul>
                            {blogPost.socialLinks?.map((link, idx) => {
                              const iconMap: Record<string, string> = {
                                facebook: 'fa-facebook-f',
                                linkedin: 'fa-linkedin-in',
                                instagram: 'fa-instagram',
                                twitter: 'fa-x-twitter',
                              }

                              return (
                                <li key={idx}>
                                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <i className={`fa-brands ${iconMap[link.platform]}`}></i>
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                        {/* Post Social Links End */}
                      </div>
                    </div>
                  </div>
                  {/* Post Tag Links End */}
                </div>
                {/* Post Single Content End */}
              </div>
            </div>
          </div>
        </div>
        {/* Page Single Post End */}
      </>
    )
  } catch (error: any) {
    throwNotFound()
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    limit: 100,
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const payload = await getPayloadClient()

  try {
    const post = (await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          equals: params.slug,
        },
      },
      limit: 1,
    })) as { docs: BlogPost[] }

    const blogPost = post.docs[0]

    return {
      title: blogPost?.meta?.title || blogPost.title,
      description: blogPost?.meta?.description || blogPost.excerpt,
      keywords: blogPost?.meta?.keywords || '',
    }
  } catch (error: any) {
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post',
    }
  }
}
