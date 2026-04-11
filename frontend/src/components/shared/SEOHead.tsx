// SEO компонент — meta-теги и Schema.org JSON-LD (UC-46)
import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  schema?: Record<string, unknown>
}

const SITE_NAME = 'Агрорезерв'
const DEFAULT_DESC =
  'Оптовые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка.'
const SITE_URL = 'https://agroreserve.ru'

const SEOHead: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogImage,
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    document.title = title
      ? `${title} — ${SITE_NAME}`
      : `${SITE_NAME} — оптовые овощи и фрукты из Узбекистана`
    _setMeta('description', description)
    _setMeta('og:title', title || SITE_NAME, 'property')
    _setMeta('og:description', description, 'property')
    _setMeta('og:type', ogType, 'property')
    _setMeta('og:site_name', SITE_NAME, 'property')
    if (canonical) {
      _setMeta('og:url', `${SITE_URL}${canonical}`, 'property')
      _setLink('canonical', `${SITE_URL}${canonical}`)
    }
    if (ogImage) _setMeta('og:image', ogImage, 'property')
    if (schema) _setJsonLd(schema)
    return () => {
      document.getElementById('seo-jsonld')?.remove()
    }
  }, [title, description, canonical, ogImage, ogType, schema])
  return null
}

function _setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}
function _setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}
function _setJsonLd(data: Record<string, unknown>) {
  let el = document.getElementById('seo-jsonld') as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = 'seo-jsonld'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default SEOHead

// Готовые Schema.org объекты

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Агрорезерв',
  legalName: 'ИП Наимов Хусейн Вохиджонович',
  url: SITE_URL,
  description: DEFAULT_DESC,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Тобольск',
    addressRegion: 'Тюменская область',
    addressCountry: 'RU',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/catalog?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export function productSchema(p: {
  name: string
  slug: string
  description?: string
  price: number
  unit: string
  category_slug?: string
  image?: string
  stock_qty?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || p.name,
    url: `${SITE_URL}/catalog/${p.category_slug || '_'}/${p.slug}`,
    image: p.image || undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: p.price,
      availability:
        (p.stock_qty ?? 0) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Агрорезерв' },
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}
