"""
SEO эндпоинты (UC-46): /sitemap.xml, /robots.txt
"""

from datetime import UTC, datetime

import structlog
from fastapi import APIRouter, Response

from app.models.product import Category, Product

logger = structlog.get_logger(__name__)

router = APIRouter(tags=["SEO"])

SITE_URL = "https://agroreserve.ru"


@router.get("/robots.txt", response_class=Response)
async def robots_txt():
    content = f"""User-agent: *
Allow: /
Allow: /catalog/
Allow: /about
Allow: /contacts
Allow: /schools

Disallow: /admin/
Disallow: /account/
Disallow: /api/
Disallow: /login
Disallow: /register
Disallow: /cart
Disallow: /checkout

Sitemap: {SITE_URL}/sitemap.xml

Host: {SITE_URL}
"""
    return Response(content=content, media_type="text/plain")


@router.get("/sitemap.xml", response_class=Response)
async def sitemap_xml():
    now = datetime.now(UTC).strftime("%Y-%m-%d")
    urls = []

    static_pages = [
        {"loc": "/", "priority": "1.0", "changefreq": "daily"},
        {"loc": "/catalog", "priority": "0.9", "changefreq": "daily"},
        {"loc": "/about", "priority": "0.5", "changefreq": "monthly"},
        {"loc": "/contacts", "priority": "0.5", "changefreq": "monthly"},
        {"loc": "/schools", "priority": "0.7", "changefreq": "weekly"},
    ]

    for page in static_pages:
        urls.append(
            {
                "loc": f"{SITE_URL}{page['loc']}",
                "lastmod": now,
                "changefreq": page["changefreq"],
                "priority": page["priority"],
            }
        )

    try:
        categories = await Category.find(Category.is_active == True).to_list()
        for cat in categories:
            urls.append(
                {
                    "loc": f"{SITE_URL}/catalog/{cat.slug}",
                    "lastmod": now,
                    "changefreq": "daily",
                    "priority": "0.8",
                }
            )
    except Exception as e:
        logger.warning("Ошибка категорий для sitemap", error=str(e))

    try:
        products = await Product.find(Product.is_active == True).to_list()
        for prod in products:
            cat_slug = ""
            if prod.category_id:
                try:
                    cat = await Category.get(prod.category_id)
                    if cat is not None:
                        cat_slug = cat.slug
                except Exception:
                    pass
            updated = now
            if hasattr(prod, "updated_at") and prod.updated_at:
                updated = prod.updated_at.strftime("%Y-%m-%d")
            loc = f"{SITE_URL}/catalog/{cat_slug}/{prod.slug}" if cat_slug else f"{SITE_URL}/catalog/_/{prod.slug}"
            urls.append(
                {
                    "loc": loc,
                    "lastmod": updated,
                    "changefreq": "weekly",
                    "priority": "0.7",
                }
            )
    except Exception as e:
        logger.warning("Ошибка товаров для sitemap", error=str(e))

    xml_parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url in urls:
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{url['loc']}</loc>")
        xml_parts.append(f"    <lastmod>{url['lastmod']}</lastmod>")
        xml_parts.append(f"    <changefreq>{url['changefreq']}</changefreq>")
        xml_parts.append(f"    <priority>{url['priority']}</priority>")
        xml_parts.append("  </url>")
    xml_parts.append("</urlset>")

    return Response(
        content="\n".join(xml_parts),
        media_type="application/xml",
        headers={"Cache-Control": "public, max-age=3600"},
    )
