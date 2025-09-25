'use client';
import { ReactNode } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export const Layout = ({ 
  children, 
  title = "Asrama Nurul Hikmah - Asrama Terpadu Islami",
  description = "Asrama terpadu yang mengembangkan akhlak mulia, prestasi akademik, dan kemandirian santri dalam lingkungan Islami yang kondusif",
  keywords = "asrama, pesantren, pendidikan islam, santri, tahfidz",
  ogImage = "/og-image.jpg"
}: LayoutProps) => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content="Asrama Nurul Hikmah" />
          
          {/* Open Graph */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:type" content="website" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImage} />
          
          {/* Additional SEO */}
          <link rel="canonical" href={window.location.href} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        
        <Navigation />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};