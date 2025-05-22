'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: {
    url: string;
  };
  slug: string;
}

export function OurServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/services?depth=1&sort=order`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data?.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading services...</div>;

  return (
    <div className="our-services dark-section">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">our services</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Reliable moving services built <span>around you</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-3 col-md-6">
              <div 
                className="service-item wow fadeInUp" 
                data-wow-delay={`${0.2 * index}s`}
              >
                <div className="icon-box">
                  <Image
                    src={service.icon.url}
                    alt={service.title}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="service-content">
                  <h3>
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-btn">
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="readmore-btn"
                  >
                    read more
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
            <div className="section-footer-text wow fadeInUp" data-wow-delay="0.8s">
              <p>Expert packing for your move. <Link href="/contact">Contact us now</Link></p>
              <Link href="/services" className="btn-default btn-highlighted">
                view all services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}