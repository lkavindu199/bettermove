'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  category: string; 
}

interface FaqCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

interface FaqSettings {
  pageTitle: string;
  highlightedText?: string;
  sidebarTitle?: string;
  sidebarContent?: string;
  sidebarContact: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [settings, setSettings] = useState<FaqSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeAccordions, setActiveAccordions] = useState<Record<string, number | null>>({});

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqsRes, categoriesRes, settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/faqs?sort=order`),
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/faq-categories?sort=order`),
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/faq-settings`)
        ]);

        const [faqsData, categoriesData, settingsData] = await Promise.all([
          faqsRes.json(),
          categoriesRes.json(),
          settingsRes.json()
        ]);

        setFaqs(faqsData.docs || []);
        setCategories(categoriesData.docs || []);
        setSettings(settingsData);
        console.log(faqs)
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (categorySlug: string, index: number) => {
    setActiveAccordions(prev => ({
      ...prev,
      [categorySlug]: prev[categorySlug] === index ? null : index
    }));
  };

  if (loading) return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <Image src="/images/loader.svg" alt="Loading" width={50} height={50} />
        </div>
      </div>
    </div>
  );

  if (!settings) return <div className="text-center py-12">FAQ page configuration missing</div>;

  return (
    <>
      {/* FAQ Content */}
      <div className="page-faqs">
        <div className="container">
          <div className="row">
            {/* Left Sidebar */}
            <div className="col-lg-4">
              <div className="page-single-sidebar">
                {/* Category Navigation */}
                <div className="page-sidebar-catagery-list wow fadeInUp">
                  <ul>
                    {categories.map(category => (
                      <li key={category.id}>
                        <a href={`#${category.slug}`}>{category.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar CTA Box */}
                <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">
                  <div className="sidebar-cta-logo">
                    <Image 
                      src="/images/logo.svg" 
                      alt="Company Logo" 
                      width={120} 
                      height={40} 
                    />
                  </div>
                  
                  <div className="sidebar-cta-content">
                    <h3>{settings.sidebarTitle || "How can we help?"}</h3>
                    <p>{settings.sidebarContact.address}</p>
                    <p>
                      <a href={`mailto:${settings.sidebarContact.email}`}>
                        {settings.sidebarContact.email}
                      </a>
                    </p>
                  </div>
                  
                  <div className="sidebar-cta-btn">
                    <a href={`tel:${settings.sidebarContact.phone}`}>
                      <Image 
                        src="/images/icon-phone.svg" 
                        alt="Phone" 
                        width={20} 
                        height={20} 
                      />
                      {settings.sidebarContact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - FAQ Sections */}
            <div className="col-lg-8">
              <div className="page-faqs-catagery">
                {categories.map(category => {
                  const categoryFaqs = faqs.filter(faq => {
                    const categoryId = typeof faq.category === 'string' ? faq.category : faq.category?.id;
                    return categoryId === category.id;
                  });
                  
                  
                  return (
                    <div key={category.id} className="faq-accordion page-faq-accordion" id={category.slug}>
                      <div className="section-title">
                        <h2 className="text-anime-style-2" data-cursor="-opaque">
                          {category.title} <span>moving</span>
                        </h2>
                      </div>

                      <div className="faq-accordion">
                        {categoryFaqs.map((faq, index) => (
                          <div 
                            key={faq.id} 
                            className={`accordion-item wow fadeInUp`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${activeAccordions[category.slug] === index ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => toggleAccordion(category.slug, index)}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div 
                              className={`accordion-collapse ${activeAccordions[category.slug] === index ? 'show' : 'collapse'}`}
                            >
                              <div className="accordion-body">
                                <p>{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}