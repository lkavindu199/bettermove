import { OurProjects } from '@/components/OurProjects';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="page-projects">
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">Our projects</h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">projects</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OurProjects />
    </div>
  );
}