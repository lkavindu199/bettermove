'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type AboutUsData = {
  title: string
  subtitle: string
  description: string
  image: string
  stats: {
    value: number
    label: string
  }[]
  quote: {
    text: string
    author: string
    position: string
    signature: string
    image: string
  }
}

export default function AboutUs() {
  const [data, setData] = useState<AboutUsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/about-us`)
      .then((res) => res.json())
      .then((data) => {
        console.log('AboutUs API response:', data)
        setData(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  if (loading) return <div className="preloader">Loading...</div>

  return (
    <div className="about-us page-about-us">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="about-us-image">
              <figure className="image-anime reveal">
                <Image
                  src={
                    typeof data?.image === 'string' && data.image.trim()
                      ? data.image
                      : '/images/about-image.jpg'
                  }
                  alt="About our company"
                  width={600}
                  height={600}
                  className="img-fluid"
                />
              </figure>
            </div>
          </div>

          <div className="col-lg-6 order-lg-2 order-1">
            <div className="about-us-content">
              <div className="section-title">
                <h3 className="wow fadeInUp">About us</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  {data?.title?.includes(' in the ') ? (
                    <>
                      {data.title.split(' in the ')[0]}{' '}
                      <span>in the {data.title.split(' in the ')[1]}</span>
                    </>
                  ) : (
                    data?.title || ''
                  )}
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  {data?.description}
                </p>
              </div>

              <div className="about-counter-box">
                {Array.isArray(data?.stats) &&
                  data.stats.map((stat, index) => (
                    <div key={index} className="about-counter-item">
                      <h2>
                        <span className="counter">{stat.value}</span>
                        {index === 0 ? '%' : '+'}
                      </h2>
                      <p>{stat.label}</p>
                    </div>
                  ))}
              </div>

              <div className="about-us-btn wow fadeInUp" data-wow-delay="0.4s">
                <a href="/about" className="btn-default">
                  more about us
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-12 order-3">
            <div className="about-owner-box">
              <div className="about-owner-info">
                <div className="about-owner-content wow fadeInUp">
                  <p>{data?.quote?.text}</p>
                </div>
                <div className="about-owner-info-body wow fadeInUp" data-wow-delay="0.2s">
                  <div className="about-owner-signature">
                    <Image
                      src={
                        typeof data?.quote?.signature === 'string' && data.quote.signature.trim()
                          ? data.quote.signature
                          : '/images/about-owner-signature.png'
                      }
                      alt="Signature"
                      width={120}
                      height={60}
                    />
                  </div>
                  <div className="about-owner-info-content">
                    <h3>{data?.quote?.author}</h3>
                    <p>{data?.quote?.position}</p>
                  </div>
                </div>
              </div>

              <div className="about-owner-image">
                <figure className="image-anime reveal">
                  <Image
                    src={
                      typeof data?.quote?.image === 'string' && data.quote.image.trim()
                        ? data.quote.image
                        : '/images/about-owner-image.jpg'
                    }
                    alt={data?.quote?.author || 'CEO'}
                    width={400}
                    height={500}
                    className="img-fluid"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
