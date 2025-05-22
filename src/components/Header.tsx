'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NavItem {
  id: number;
  title: string;
  linkType: 'internal' | 'external' | 'anchor';
  internalUrl?: string;
  externalUrl?: string;
  anchorId?: string;
  subItems?: NavItem[];
  order?: number;
}

export function Header() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/navigation`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        const items = Array.isArray(data.docs) ? data.docs : [];

        const validItems = items.filter(item =>
          item.title &&
          item.linkType &&
          (item.internalUrl || item.externalUrl || item.anchorId)
        );

        const sortedItems = validItems.sort((a, b) => (a.order || 0) - (b.order || 0));
        setNavItems(sortedItems);
      } catch (error) {
        console.error('Error fetching navigation:', error);
        setNavItems([
          { id: 1, title: 'Home', linkType: 'internal', internalUrl: '/' },
          { id: 2, title: 'About Us', linkType: 'internal', internalUrl: '/about' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  const getLinkHref = (item: NavItem) => {
    switch (item.linkType) {
      case 'internal': return item.internalUrl || '#';
      case 'external': return item.externalUrl || '#';
      case 'anchor': return `#${item.anchorId || ''}`;
      default: return '#';
    }
  };

  const renderLink = (item: NavItem) => {
    const href = getLinkHref(item);
    if (item.linkType === 'external') {
      return (
        <a href={href} className="nav-link" target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      );
    }

    return (
      <Link href={href} className="nav-link">
        {item.title}
      </Link>
    );
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="main-header">
      <div className="header-sticky">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <Image src="/images/logo.svg" alt="Logo" width={120} height={40} priority />
            </Link>

            {/* Mobile Toggle Button */}
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon">{isMenuOpen ? '✕' : '☰'}</span>
            </button>

            {/* Navigation */}
            <div className={`collapse navbar-collapse main-menu ${isMenuOpen ? 'show' : ''}`}>
              <div className="nav-menu-wrapper">
                <ul className="navbar-nav mr-auto" id="menu">
                  {navItems.map((item) => (
                    <li key={item.id} className={`nav-item${item.subItems?.length ? ' submenu' : ''}`}>
                      {renderLink(item)}
                      {item.subItems && item.subItems.length > 0 && (
                        <ul>
                          {item.subItems.map((sub) => (
                            <li key={sub.id} className="nav-item">
                              {renderLink(sub)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="responsive-menu"></div>
      </div>
    </header>
  );
}
