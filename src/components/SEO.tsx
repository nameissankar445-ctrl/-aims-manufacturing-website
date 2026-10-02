import { useEffect } from 'react';

export const SITE_NAME = 'AIMS Manufacturing';
export const BASE_URL = 'https://www.aimsmanufacturing.com';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const SEO = ({ title, description, keywords, canonicalUrl }: SEOProps) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    if (canonicalUrl) {
      setCanonical(canonicalUrl);
      setMeta('og:url', canonicalUrl, 'property');
    }
  }, [title, description, keywords, canonicalUrl]);

  return null;
};

export default SEO;
