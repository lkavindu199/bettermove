'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectItem {
  id: string;
  title: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  slug: string;
}

export function OurProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/projects?limit=6&depth=1&sort=order`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data?.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="our-projects">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">latest projects</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Every move counts discover our <span>latest work</span>
              </h2>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="section-title-content wow fadeInUp" data-wow-delay="0.2s">
              <p>
                Take a closer look at our recent projects and see how we turn every move into a seamless experience. 
                From small local moves to large-scale relocations, we&#39;re proud to showcase the care.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {projects.map((project, index) => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div 
                className="project-item wow fadeInUp" 
                data-wow-delay={`${0.2 * index}s`}
              >
                <div className="project-image">
                  <figure className="image-anime">
                    <Image
                      src={project.featuredImage.url}
                      alt={project.featuredImage.alt || project.title}
                      width={500}
                      height={400}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>

                  <div className="project-btn">
                    <Link href={`/projects/${project.slug}`}>
                      <Image 
                        src="/images/arrow-white.svg" 
                        alt="View project" 
                        width={24} 
                        height={24} 
                      />
                    </Link>
                  </div>
                </div>
                <div className="project-content">
                  <h3>
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
            <div className="section-footer-btn wow fadeInUp" data-wow-delay="1.2s">
              <Link href="/projects" className="btn-default">
                view all projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}