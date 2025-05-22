'use client'

import React, { useState, useEffect } from 'react'

interface ContactInfoType {
  phone: string
  email: string
  address: string
  sectionTitle?: string
  sectionSubtitle?: string
  callToActionText?: string
  emailText?: string
  visitText?: string
  formTitle?: string
  location: {
    latitude: number
    longitude: number
  }
}

export default function ContactUs() {
  const [data, setData] = useState<ContactInfoType | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/contact-info`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Form submitted:', formData)
  }

  if (loading) return <div className="preloader">Loading...</div>

  if (!data) return <div>No contact information available.</div>

  const {
    phone,
    email,
    address,
    sectionTitle,
    callToActionText = 'Call to question',
    emailText = 'Send e-mail',
    visitText = 'Visit anytime',
    formTitle = 'Send message with us',
    location,
  } = data

  const { latitude, longitude } = location

  return (
    <>
      <div className="page-contact-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="contact-us-content">
                <div className="section-title section-title-center">
                  <h3 className="wow fadeInUp">{sectionTitle || 'Contact form'}</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Get in to <span>touch</span>
                  </h2>
                </div>

                <div className="contact-info-list">
                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.2s">
                    <div className="icon-box">
                      <img src="/images/icon-phone.svg" alt="Phone icon" />
                    </div>
                    <div className="contact-info-content">
                      <p>{callToActionText}</p>
                      <h3>
                        <a href={`tel:${phone}`}>{phone}</a>
                      </h3>
                    </div>
                  </div>

                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.4s">
                    <div className="icon-box">
                      <img src="/images/icon-mail.svg" alt="Mail icon" />
                    </div>
                    <div className="contact-info-content">
                      <p>{emailText}</p>
                      <h3>
                        <a href={`mailto:${email}`}>{email}</a>
                      </h3>
                    </div>
                  </div>

                  <div className="contact-info-item wow fadeInUp" data-wow-delay="0.6s">
                    <div className="icon-box">
                      <img src="/images/icon-location.svg" alt="Location icon" />
                    </div>
                    <div className="contact-info-content">
                      <p>{visitText}</p>
                      <h3>{address}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="contact-us-form">
                <div className="section-title">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    {formTitle} <span>with us</span>
                  </h2>
                </div>

                <div className="contact-form">
                  <form onSubmit={handleSubmit} className="wow fadeInUp" data-wow-delay="0.2s">
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="fname"
                          className="form-control"
                          value={formData.fname}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          required
                        />
                        <i className="fa-regular fa-user"></i>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="lname"
                          className="form-control"
                          value={formData.lname}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          required
                        />
                        <i className="fa-regular fa-user"></i>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address"
                          required
                        />
                        <i className="fa-regular fa-envelope"></i>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          required
                        />
                        <img src="/images/icon-phone-primary.svg" alt="" />
                      </div>

                      <div className="form-group col-md-12 mb-5">
                        <textarea
                          name="message"
                          className="form-control"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Message"
                        ></textarea>
                      </div>

                      <div className="col-lg-12">
                        <div className="contact-form-btn">
                          <button type="submit" className="btn-default">
                            submit message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="google-map">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="google-map-iframe">
                <iframe
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
