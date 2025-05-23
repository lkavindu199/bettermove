import { OurServices } from '@/components/OurServices';
import { Metadata } from 'next';
import Link from 'next/link'; 

export const metadata: Metadata = {
  title: 'Our Services - Movein',
  description: 'Explore our professional moving and packing services',
};

export default function ServicesPage() {
  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">Our services</h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                     <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">services</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OurServices />

    </>
  );
}