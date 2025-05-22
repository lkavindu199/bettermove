'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: {
    url: string;
    alt?: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
  slug: string;
}

interface TeamSettings {
  title: string;
  highlightedText: string;
}

export function OurTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [settings, setSettings] = useState<TeamSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team members
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/team-members?sort=order`)
      .then(res => res.json())
      .then(data => setTeamMembers(data.docs || []));

    // Fetch team settings
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/team-settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading team...</div>;
  if (!settings) return <div className="text-center py-12">Team section not configured</div>;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <i className="fa-brands fa-instagram"></i>;
      case 'facebook':
        return <i className="fab fa-facebook-f"></i>;
      case 'dribbble':
        return <i className="fa-brands fa-dribbble"></i>;
      case 'linkedin':
        return <i className="fa-brands fa-linkedin-in"></i>;
      case 'twitter':
        return <i className="fa-brands fa-twitter"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="our-team dark-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">team member</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                {settings.title} <span>{settings.highlightedText}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="col-lg-3 col-md-6">
              <div 
                className="team-item wow fadeInUp" 
                data-wow-delay={`${0.2 * index}s`}
              >
                <div className="team-image">
                  <Link href={`/team/${member.slug}`} data-cursor-text="View">
                    <figure className="image-anime">
                      <Image
                        src={member.image.url}
                        alt={member.image.alt || member.name}
                        width={300}
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </figure>
                  </Link>
                  
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="team-social-icon">
                      <ul>
                        {member.socialLinks.map((social, i) => (
                          <li key={i}>
                            <a 
                              href={social.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {getPlatformIcon(social.platform)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="team-content">
                  <h3>
                    <Link href={`/team/${member.slug}`}>
                      {member.name}
                    </Link>
                  </h3>
                  <p>{member.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}