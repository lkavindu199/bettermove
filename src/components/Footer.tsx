'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FooterData {
  logo: string | { url: string }
  description: string
  quickLinks: Array<{ label: string; url: string }>
  socialLinks: Array<{ platform: string; url: string }>
  copyrightText: string
}

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
  location?: {
    latitude: number
    longitude: number
  }
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Fetch footer data
        const footerRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/footer`)
        if (!footerRes.ok) throw new Error('Failed to fetch footer data')
        const footerData = await footerRes.json()
        const docs = Array.isArray(footerData.docs) ? footerData.docs : []
        if (docs.length > 0) {
          setFooterData(docs[0] as FooterData)
        }

        // Fetch contact info - Payload CMS globals don't have a docs array
        const contactRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/contact-info`,
        )
        if (!contactRes.ok) throw new Error('Failed to fetch contact info')
        const contactData = await contactRes.json()
        setContactInfo(contactData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for subscribing!')
        setEmail('')
      } else {
        setSubmitMessage('Subscription failed. Please try again.')
      }
    } catch {
      setSubmitMessage('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  if (isLoading || !footerData || !contactInfo) {
    return (
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-4">Loading footer...</div>
          </div>
        </div>
      </footer>
    )
  }

  const currentYear = new Date().getFullYear()
  const copyrightText = footerData?.copyrightText
    ? footerData?.copyrightText.replace('{year}', currentYear.toString())
    : ''

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          {/* About Footer */}
          <div className="col-lg-3 col-md-12">
            <div className="about-footer">
              <div className="footer-logo">
                <Image
                  src={typeof footerData.logo === 'string' ? footerData.logo : footerData.logo.url}
                  alt="Company Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div className="about-footer-content">
                <p>{footerData.description}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-5">
            <div className="footer-links">
              <h3>quick link</h3>
              <ul>
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          {contactInfo && (
            <div className="col-lg-3 col-md-7">
              <div className="footer-links">
                <h3>{contactInfo.sectionTitle || 'Contact us'}</h3>
                <div className="footer-contact-item">
                  <div className="icon-box">
                    <Image src="/images/icon-location.svg" alt="Location" width={20} height={20} />
                  </div>
                  <div className="footer-contact-content">
                    <p>{contactInfo.address || '123 Main Street, City, Country'}</p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <div className="icon-box">
                    <Image src="/images/icon-mail.svg" alt="Email" width={20} height={20} />
                  </div>
                  <div className="footer-contact-content">
                    <p>
                      <a href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email || 'info@company.com'}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <div className="icon-box">
                    <Image src="/images/icon-phone.svg" alt="Phone" width={20} height={20} />
                  </div>
                  <div className="footer-contact-content">
                    <p>
                      <a href={`tel:${contactInfo.phone?.replace(/\D/g, '')}`}>
                        {contactInfo.phone || '+1234567890'}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="col-lg-3 col-md-12">
            <div className="footer-links footer-newsletter-form">
              <h3>{footerData.newsletter.title}</h3>
              <p>{footerData.newsletter.description}</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="mail"
                    className="form-control"
                    id="mail"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-default btn-highlighted"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'subscribe'}
                  </button>
                </div>
                {submitMessage && (
                  <div className="mt-2 text-center">
                    <small>{submitMessage}</small>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="col-lg-12">
            <div className="footer-copyright">
              <div className="footer-copyright-text">
                <p>
                  &copy; {currentYear} {copyrightText || 'All Rights Reserved.'}
                </p>
              </div>
              <div className="footer-social-links">
                <ul className="d-flex gap-3">
                  {footerData.socialLinks.map((social, index) => (
                    <li key={index}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                      >
                        <i className={`fa-brands fa-${social.platform}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
