'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RichText } from '@/components/RichText';

interface ProjectDetails {
  id: string;
  title: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  slug: string;
  shortDescription: string;
  content?: any; // For rich text content
  budget?: string;
  duration?: string;
  date?: string;
  category?: string;
}

export default function ProjectSingle({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/projects?where[slug][equals]=${params.slug}&limit=1&depth=1`
        );
        const data = await response.json();
        
        if (data.docs && data.docs.length > 0) {
          setProject(data.docs[0]);
        } else {
          notFound();
        }
      } catch (err) {
        console.error('Failed to fetch project:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  if (loading) return <div>Loading project...</div>;
  if (!project) return notFound();

  return (
    <div className="page-project-single">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="page-single-sidebar">
              <div className="project-detail-box wow fadeInUp">
                <div className="project-detail-title">
                  <h3>Project details</h3>
                </div>

                <div className="project-detail-list">
                  <div className="project-detail-item">
                    <div className="icon-box">
                      <Image 
                        src="/images/icon-project-detail-1.svg" 
                        alt="Project name" 
                        width={24} 
                        height={24} 
                      />
                    </div>
                    <div className="project-detail-content">
                      <h3>Project name</h3>
                      <p>{project.title}</p>
                    </div>
                  </div>

                  {project.category && (
                    <div className="project-detail-item">
                      <div className="icon-box">
                        <Image 
                          src="/images/icon-project-detail-2.svg" 
                          alt="Category" 
                          width={24} 
                          height={24} 
                        />
                      </div>
                      <div className="project-detail-content">
                        <h3>Category</h3>
                        <p>{project.category}</p>
                      </div>
                    </div>
                  )}

                  {project.budget && (
                    <div className="project-detail-item">
                      <div className="icon-box">
                        <Image 
                          src="/images/icon-project-detail-3.svg" 
                          alt="Budget" 
                          width={24} 
                          height={24} 
                        />
                      </div>
                      <div className="project-detail-content">
                        <h3>Budget</h3>
                        <p>{project.budget}</p>
                      </div>
                    </div>
                  )}

                  {project.date && (
                    <div className="project-detail-item">
                      <div className="icon-box">
                        <Image 
                          src="/images/icon-project-detail-4.svg" 
                          alt="Date" 
                          width={24} 
                          height={24} 
                        />
                      </div>
                      <div className="project-detail-content">
                        <h3>Date</h3>
                        <p>{project.date}</p>
                      </div>
                    </div>
                  )}

                  {project.duration && (
                    <div className="project-detail-item">
                      <div className="icon-box">
                        <Image 
                          src="/images/icon-project-detail-5.svg" 
                          alt="Duration" 
                          width={24} 
                          height={24} 
                        />
                      </div>
                      <div className="project-detail-content">
                        <h3>Duration</h3>
                        <p>{project.duration}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="sidebar-cta-logo">
                  <Image src="/images/logo.svg" alt="Logo" width={150} height={50} />
                </div>
                
                <div className="sidebar-cta-content">
                  <h3>How can we help?</h3>
                  <p>3891 Ranchview Mr. Richardson, 62639</p>
                  <p><a href="mailto:info@domainname.com">info@domainname.com</a></p>
                </div>
                
                <div className="sidebar-cta-btn">
                  <a href="tel:+112345678">
                    <Image src="/images/icon-phone.svg" alt="Phone" width={24} height={24} />
                    +1 123 456 78
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="project-single-content">
              <div className="page-single-image">
                <figure className="image-anime reveal">
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt || project.title}
                    width={800}
                    height={600}
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
              </div>

              <div className="project-entry">
                {project.content ? (
                  <RichText content={project.content} />
                ) : (
                  <p className="wow fadeInUp">{project.shortDescription}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}