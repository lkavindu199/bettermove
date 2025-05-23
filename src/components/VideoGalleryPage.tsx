'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface VideoItem {
  id: string
  videoUrl?: string
  videoUpload?: { url: string }
  thumbnail?: { url: string }
  altText: string
  order: number
}

interface GallerySettings {
  pageTitle: string
  highlightedText?: string
}

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [settings, setSettings] = useState<GallerySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<{ type: 'youtube' | 'local', src: string } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/videos?sort=order`),
          fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/globals/gallery-settings`)
        ])
        const [videosData, settingsData] = await Promise.all([
          videosRes.json(),
          settingsRes.json()
        ])
        setVideos(videosData.docs || [])
        setSettings(settingsData)
      } catch (error) {
        console.error('Error fetching video data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com.*(?:\/|v=)|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const openVideoModal = (video: VideoItem) => {
    const ytId = extractYouTubeId(video.videoUrl || '')
    if (ytId) {
      setCurrentVideo({ type: 'youtube', src: `https://www.youtube.com/embed/${ytId}?autoplay=1` })
    } else if (video.videoUpload?.url) {
      setCurrentVideo({ type: 'local', src: video.videoUpload.url })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentVideo(null)
  }

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
    )
  }

  if (!settings) return <div className="text-center py-12">Gallery configuration missing</div>

  return (
    <>
      {/* Modal */}
      {modalOpen && currentVideo && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            {currentVideo.type === 'youtube' ? (
              <iframe
                src={currentVideo.src}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <video controls autoPlay style={{ width: '100%', height: '100%' }}>
                <source src={currentVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  {settings.pageTitle || 'Video gallery'}
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                         <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">video gallery</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery */}
      <div className="page-video-gallery">
        <div className="container">
          <div className="row">
            {videos.map((video, index) => {
              const thumbnailUrl = video.thumbnail?.url || '/images/placeholder.jpg'
              return (
                <div key={video.id} className="col-lg-4 col-md-6">
                  <div
                    className="video-gallery-image wow fadeInUp"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <button
                      onClick={() => openVideoModal(video)}
                      className="popup-video"
                      style={{
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      <figure>
                        <Image
                          src={thumbnailUrl}
                          alt={video.altText}
                          width={400}
                          height={300}
                          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                        />
                      </figure>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .video-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .video-modal-content {
          position: relative;
          width: 90%;
          max-width: 800px;
          aspect-ratio: 16 / 9;
          background: #000;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 18px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
