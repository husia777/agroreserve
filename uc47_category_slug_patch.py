#!/usr/bin/env python3
"""
Патч catalog.py — добавляет category dict с slug в ответ API (список + карточка).
"""
FILE = "/home/husein/Downloads/agrorezerv/backend/app/routers/catalog.py"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# ── Патч 1: Кешируем категории с slug (не только name) ──────
old1 = '''    # Загружаем категории для денормализации
    category_names: dict = {}
    for product in products:
        if product.category_id:
            cat_id = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
            if cat_id not in category_names:
                try:
                    fetched_cat = await product.category_id.fetch()
                    if fetched_cat:
                        category_names[cat_id] = fetched_cat.name
                except Exception:
                    category_names[cat_id] = ""'''

new1 = '''    # Загружаем категории для денормализации (имя + slug)
    category_cache: dict = {}
    for product in products:
        if product.category_id:
            cat_id = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
            if cat_id not in category_cache:
                try:
                    fetched_cat = await product.category_id.fetch()
                    if fetched_cat:
                        category_cache[cat_id] = {"id": str(fetched_cat.id), "name": fetched_cat.name, "slug": fetched_cat.slug or ""}
                    else:
                        category_cache[cat_id] = {"id": cat_id, "name": "", "slug": ""}
                except Exception:
                    category_cache[cat_id] = {"id": cat_id, "name": "", "slug": ""}'''

if old1 in content:
    content = content.replace(old1, new1)
    print("✅ Патч 1: category_cache с slug — применён")
else:
    print("❌ Патч 1: не найден целевой блок category_names")

# ── Патч 2: Используем category_cache вместо category_names ──
old2 = '''        cat_id_str = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
        cat_name = category_names.get(cat_id_str, "")'''

new2 = '''        cat_id_str = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
        cat_info = category_cache.get(cat_id_str, {"id": cat_id_str, "name": "", "slug": ""})
        cat_name = cat_info["name"]'''

if old2 in content:
    content = content.replace(old2, new2)
    print("✅ Патч 2: cat_info — применён")
else:
    print("❌ Патч 2: не найден")

# ── Патч 3: Добавляем category dict в ProductResponse (список) ──
old3 = '''                category_id=cat_id_str,
                category_name=cat_name,
                description=product.description,
                country_of_origin=product.origin_country,
                unit=product.unit.value,
                unit_weight=product.avg_item_weight_kg,
                price_retail=product.price_retail,
                price_purchase=getattr(product, "cost_price", 0) or 0,
                # Оптовая цена — только для B2B
                price_wholesale=product.price_wholesale if is_b2b else 0,'''

new3 = '''                category_id=cat_id_str,
                category_name=cat_name,
                category=cat_info,
                description=product.description,
                country_of_origin=product.origin_country,
                unit=product.unit.value,
                unit_weight=product.avg_item_weight_kg,
                price_retail=product.price_retail,
                price_purchase=getattr(product, "cost_price", 0) or 0,
                # Оптовая цена — только для B2B
                price_wholesale=product.price_wholesale if is_b2b else 0,'''

if old3 in content:
    content = content.replace(old3, new3)
    print("✅ Патч 3: category dict в список — применён")
else:
    print("❌ Патч 3: не найден")

# ── Патч 4: Добавляем category dict в карточку товара ──
old4 = '''    return ProductResponse(
        id=str(product.id),
        name=product.name,
        slug=product.slug,
        category_id=cat_id_str,
        category_name=cat_name,
        description=product.description,'''

new4 = '''    return ProductResponse(
        id=str(product.id),
        name=product.name,
        slug=product.slug,
        category_id=cat_id_str,
        category_name=cat_name,
        category={"id": cat_id_str, "name": cat_name, "slug": cat.slug if cat else ""},
        description=product.description,'''

if old4 in content:
    content = content.replace(old4, new4)
    print("✅ Патч 4: category dict в карточку — применён")
else:
    print("❌ Патч 4: не найден")

with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("\n=== Готово ===")
