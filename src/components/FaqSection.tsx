'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FaqItem {
  id: string
  question: string
  answer: string
  order: number
}

interface FaqSettings {
  title: string
  highlightedText: string
  image: {
    url: string
    alt?: string
  }
  videoUrl: string
}

export function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [settings, setSettings] = useState<FaqSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch FAQs
        const faqsRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/faqs?sort=order`);
        const faqsData = await faqsRes.json();
        
        const filteredFaqs = (faqsData.docs || []).filter(
          (faq: FaqItem) => Number(faq.order) >= 1 && Number(faq.order) <= 5
        );
        setFaqs(filteredFaqs);
  
        // Fetch settings
        const settingsRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/faq-settings`);
        const settingsData = await settingsRes.json();
        setSettings(settingsData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-12">Loading FAQs...</div>
  if (!settings) return <div className="text-center py-12">FAQ section not configured</div>

  return (
    <div className="our-faqs">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-6">
            <div className="faq-content-box">
              <div className="our-faqs-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">frequently asked questions</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    {settings.title} <span>{settings.highlightedText}</span>
                  </h2>
                </div>

                <div className="faq-accordion">
                  {faqs.map((faq, index) => (
                    <div
                      key={faq.id}
                      className={`accordion-item wow fadeInUp`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => toggleAccordion(index)}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse ${activeIndex === index ? 'show' : 'collapse'}`}
                      >
                        <div className="accordion-body">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="faqs-image">
              <div className="faq-image">
                <figure className="image-anime">
                  <Image
                    src={settings.image?.url || '/images/faq-image.jpg'}
                    alt={settings.image?.alt || 'FAQ section image'}
                    width={800}
                    height={600}
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
              </div>

              <div className="intro-video-button">
                <a
                  href={settings.videoUrl}
                  className="popup-video"
                  data-cursor-text="Play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <figure>
                    <Image
                      src="/images/intro-video-circle.svg"
                      alt="Video circle"
                      width={150}
                      height={150}
                    />
                  </figure>

                  <div className="into-video-play-icon">
                    <Image
                      src="/images/intro-video-play-btn.svg"
                      alt="Play button"
                      width={40}
                      height={40}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
