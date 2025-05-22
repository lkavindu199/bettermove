'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UploadedImage {
  url: string;
  filename: string;
  mimeType: string;
}

interface GalleryImage {
  id: string;
  image: UploadedImage;
  altText: string;
  order: number;
}

interface GallerySettings {
  imagepageTitle: string;
  imagehighlightedText?: string;
}

export default function ImageGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<GallerySettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesRes, settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/gallery-images?sort=order`),
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/gallery-settings`)
        ]);

        const [imagesData, settingsData] = await Promise.all([
          imagesRes.json(),
          settingsRes.json()
        ]);

        setImages(imagesData.docs || []);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-icon">
            <Image src="/images/loader.svg" alt="Loading" width={50} height={50} />
          </div>
        </div>
      </div>
    );
  }

  if (!settings) return <div className="text-center py-12">Gallery configuration missing</div>;

  return (
    <>
      {/* Page Header */}
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  {settings.pageTitle || "Image gallery"}
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      image gallery
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="page-gallery">
        <div className="container">
          <div className="row gallery-items page-gallery-box">
            {images.map((image, index) => (
              <div key={image.id} className="col-lg-4 col-6">
                <div
                  className="photo-gallery wow fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Link href={image.image.url} data-cursor-text="View" scroll={false}>
                    <figure className="image-anime">
                      <Image
                        src={image.image.url}
                        alt={image.altText}
                        width={400}
                        height={300}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                    </figure>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
