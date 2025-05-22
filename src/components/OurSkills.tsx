'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SkillItem {
  title: string;
  percentage: number;
}

interface SkillsData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  images: {
    image: {
      url: string;
      alt?: string;
    };
    position: string;
  }[];
  skills: SkillItem[];
}

export function OurSkills() {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch skills data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (skillsData) {
      // Initialize skill bar animations
      const skillbars = document.querySelectorAll('.skillbar');
      skillbars.forEach((bar) => {
        const percent = bar.getAttribute('data-percent');
        if (percent) {
          const countBar = bar.querySelector('.count-bar') as HTMLElement;
          if (countBar) {
            countBar.style.width = percent;
          }
        }
      });
    }
  }, [skillsData]);

  if (loading) return <div>Loading skills...</div>;
  if (!skillsData) return <div>No skills data available.</div>;

  const image1 = skillsData.images?.find(img => img.position === 'image-1');
  const image2 = skillsData.images?.find(img => img.position === 'image-2');

  return (
    <div className="our-skill">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="our-skill-images">
              {image1 && (
                <div className="our-skill-image-1">
                  <figure className="image-anime reveal">
                    <Image
                      src={image1.image.url}
                      alt={image1.image.alt || 'Skill image 1'}
                      width={500}
                      height={600}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                </div>
              )}

              {image2 && (
                <div className="our-skill-image-2">
                  <figure className="image-anime reveal">
                    <Image
                      src={image2.image.url}
                      alt={image2.image.alt || 'Skill image 2'}
                      width={400}
                      height={500}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                </div>
              )}

              <div className="contact-us-circle">
                <Link href="/contact">
                  <Image 
                    src="/images/contact-us-circle.svg" 
                    alt="Contact us" 
                    width={150} 
                    height={150} 
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="our-skill-content">
              <div className="section-title">
                <h3 className="wow fadeInUp">our skill</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  {skillsData.title} <span>{skillsData.subtitle}</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  {skillsData.description}
                </p>
              </div>

              <div className="our-skill-body">
                {skillsData.skills?.map((skill, index) => (
                  <div key={index} className="skills-progress-bar">
                    <div 
                      className="skillbar" 
                      data-percent={`${skill.percentage}%`}
                    >
                      <div className="skill-data">
                        <div className="skill-title">{skill.title}</div>
                        <div className="skill-no">{skill.percentage}%</div>
                      </div>
                      <div className="skill-progress">
                        <div 
                          className="count-bar" 
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="our-skill-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href="/contact" className="btn-default">
                  {skillsData.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}