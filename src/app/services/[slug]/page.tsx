'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@/components/RichText';
import React from 'react';

interface ServiceDetails {
  id: string;
  title: string;
  description: string;
  content: any;
  slug: string;
  icon: {
    url: string;
    alt?: string;
  };
  featuredImage?: {
    url: string;
    alt?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function ServiceSingle({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const slug = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the service
        const serviceRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/services?where[slug][equals]=${slug}&limit=1&depth=2`
        );
        const serviceData = await serviceRes.json();
        
        // Fetch all categories
        const categoriesRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/service-categories?limit=100`
        );
        const categoriesData = await categoriesRes.json();

        if (serviceData.docs && serviceData.docs.length > 0) {
          setService(serviceData.docs[0]);
          setCategories(categoriesData.docs || []);
        } else {
          notFound();
        }
      } catch (err:any) {
        console.error('Failed to fetch data:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading service...</div>;
  if (!service) return notFound();

  return (
    <div className="page-service-single">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="page-single-sidebar">
              <div className="page-sidebar-catagery-list wow fadeInUp">
                <h3>services category</h3>
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/services/category/${category.slug}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
            <div className="service-single-contemt">
              {service.featuredImage && (
                <div className="page-single-image">
                  <figure className="image-anime reveal">
                    <Image
                      src={service.featuredImage.url}
                      alt={service.featuredImage.alt || service.title}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                </div>
              )}
              
              <div className="service-entry">
                <p className="wow fadeInUp">{service.description}</p>
                
                {service.content && (
                  <div className="wow fadeInUp" data-wow-delay="0.2s">
                    <RichText content={service.content} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}