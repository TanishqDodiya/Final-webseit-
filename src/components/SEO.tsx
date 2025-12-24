import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'ELYF EVSPARE - Premium Electric Vehicle Spare Parts & Accessories',
  description = 'Shop premium electric vehicle spare parts, EV chargers, controllers, motors, and accessories. Quality components for all your electric vehicle needs with fast delivery.',
  keywords = 'electric vehicle parts, EV chargers, lithium chargers, EV controllers, hub motors, battery packs, electric vehicle accessories',
  image = '/placeholder.svg',
  url = window.location.href,
  type = 'website',
  noIndex = false,
}) => {
  const siteTitle = 'ELYF EVSPARE';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="ELYF EVSPARE" />
      <meta name="theme-color" content="#2563eb" />
    </Helmet>
  );
};

export default SEO;