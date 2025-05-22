'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TickerItem {
  text: string;
  icon: {
    url: string;
    alt?: string;
  };
}

interface TickerSettings {
  items: TickerItem[];
  speed: number;
}

export function ScrollingTicker() {
  const [data, setData] = useState<TickerSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/ticker-settings`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch ticker data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data || !tickerRef.current) return;

    const ticker = tickerRef.current;
    const contents = ticker.querySelectorAll('.scrolling-content');
    let animationFrame: number;
    let position = 0;

    const animate = () => {
      position -= 1;
      if (position <= -contents[0].clientWidth) {
        position = 0;
      }
      
      contents.forEach(content => {
        content.style.transform = `translateX(${position}px)`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation
    const speed = data.speed || 20;
    const interval = setInterval(animate, speed);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, [data]);

  if (loading) return <div className="h-16 bg-gray-100"></div>;
  if (!data) return null;

  return (
    <div className="our-scrolling-ticker py-4">
      <div className="scrolling-ticker-box overflow-hidden" ref={tickerRef}>
        {/* First set of items */}
        <div className="scrolling-content flex whitespace-nowrap">
          {data.items?.map((item, index) => (
            <span key={`first-${index}`} className="inline-flex items-center mx-8 text-white font-bold text-lg">
              <Image 
                src={item.icon?.url || 'images/icon-asterisk.svg'} 
                alt={item.icon?.alt || ''} 
                width={200} 
                height={200} 
                className=""
              />
              {item.text}
            </span>
          ))}
        </div>
        
        {/* Second set of items (duplicate for seamless looping) */}
        <div className="scrolling-content flex whitespace-nowrap">
          {data.items.map((item, index) => (
            <span key={`second-${index}`} className="inline-flex items-center mx-8 text-white font-bold text-lg">
              <Image 
                src={item.icon?.url || 'images/icon-asterisk.svg'} 
                alt={item.icon?.alt || ''} 
                width={200} 
                height={200} 
                className=""
              />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}