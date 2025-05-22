'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WorkProcessItem } from '@/types/payload-types';

export function WorkProcess() {
  const [items, setItems] = useState<WorkProcessItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/work-process?depth=1&sort=order`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data?.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch work process:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading work process...</div>;
  if (!items.length) return <div>No work process steps available.</div>;

  return (
    <div className="our-work-process dark-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">our work process</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Reliable moving services built <span>around you</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          {/* Work Process List Start */}
          <div className="wrok-process-list">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="work-process-item wow fadeInUp"
                data-wow-delay={`${0.2 * index}s`}
              >
                <div className="icon-box">
                  <Image
                    src={item.icon.url}
                    alt={item.title}
                    width={60}
                    height={60}
                  />
                  <div className="work-process-number">
                    <h3>{index + 1}</h3>
                  </div>
                </div>
                <div className="work-process-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Work Process List End */}
        </div>
      </div>
    </div>
  );
}
