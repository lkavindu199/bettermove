'use client'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

type Slide = {
  id: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  image: {
    url: string
  }
  reviews: {
    rating: number
    count: number
  }
  satisfyCustomerImages: {
    image: {
      url: string
    }
  }[]
}

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/slides?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        // console.log('Slides API response:', data)
        setSlides(data?.docs || [])
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  if (loading) return <div className="preloader">Loading...</div>

  return (
    <div className="hero hero-slider-layout dark-section">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="swiper"
      >
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide">
              <div className="hero-slide">
                <div className="hero-slider-image">
                  <Image
                    src={(slide.image as any)?.url || '/images/hero-bg.jpg'}
                    alt={slide.title}
                    fill
                    className="hero-background"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="container">
                  <div className="row align-items-end">
                    <div className="col-lg-12">
                      <div className="hero-content-box">
                        <div className="hero-content">
                          <div className="section-title">
                            <h1 className="text-anime-style-2" data-cursor="-opaque">
                              {slide.title.split(' ')[0]} <span>{slide.title.split(' ')[1]}</span>
                            </h1>
                            <p className="wow fadeInUp">{slide.subtitle}</p>
                          </div>
                        </div>

                        <div className="hero-customer-box">
                          <div className="hero-customer-content wow fadeInUp">
                            <p>Experience a stress-free move with our professional services</p>
                          </div>

                          <div className="satisfy-customer-box">
                            <div className="satisfy-customer-images">
                              {slide.satisfyCustomerImages?.map((imgObj, index) => (
                                <div key={index} className="satisfy-customer-image">
                                  <figure className="image-anime reveal">
                                    <Image
                                      src={imgObj.image?.url}
                                      alt={`Happy customer ${index + 1}`}
                                      width={50}
                                      height={50}
                                      className="rounded-circle"
                                    />
                                  </figure>
                                </div>
                              ))}
                            </div>

                            <div className="satisfy-customer-content">
                              <h3>Customer Satisfied</h3>
                              <p>
                                <span className="counter">{slide.reviews.rating}</span>(
                                {slide.reviews.count.toLocaleString()} Reviews)
                              </p>
                            </div>
                          </div>

                          <div className="hero-btn wow fadeInUp" data-wow-delay="0.2s">
                            <a href={slide.buttonLink} className="btn-default btn-highlighted">
                              {slide.buttonText}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  )
}
