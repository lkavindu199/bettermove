'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TestimonialItem } from '@/types/payload-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/testimonials?depth=1`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data?.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch testimonials:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div className="our-testimonials">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">testimonials</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Words of appreciation from <span>our customers</span>
              </h2>
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {/* Testimonial Slider Start */}
            <div className="testimonial-slider">
              <div className="swiper">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: '.testimonial-btn-next',
                    prevEl: '.testimonial-btn-prev',
                  }}
                  spaceBetween={30}
                  slidesPerView={2}
                  loop
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  <div className="swiper-wrapper" data-cursor-text="Drag">
                    {testimonials.map((testimonial) => (
                      <SwiperSlide key={testimonial.id} className="swiper-slide">
                        <div className="testimonial-item">
                          <div className="author-image">
                            <figure className="image-anime">
                              <Image
                                src={testimonial.authorImage.url}
                                alt={testimonial.authorName}
                                width={70}
                                height={70}
                                layout="intrinsic"
                                className="object-cover w-full h-full rounded-full"
                              />
                            </figure>
                          </div>

                          <div className="author-content">
                            <div className="author-title">
                              <h3>
                                {testimonial.authorName}, {testimonial.authorTitle}
                              </h3>
                            </div>
                            <div className="author-rating">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                              ))}
                            </div>
                          </div>

                          <div className="testimonial-content">
                            <p>{testimonial.content}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="testimonial-btn">
                    <div className="testimonial-btn-prev"></div>
                    <div className="testimonial-btn-next"></div>
                  </div>
                </Swiper>
              </div>
            </div>
            {/* Testimonial Slider End */}
          </div>
        </div>
      </div>
    </div>
  );
}
