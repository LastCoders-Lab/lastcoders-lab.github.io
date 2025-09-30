// 1) Все md как модули (для метаданных) — сразу, чтобы было быстрее работать с массивами
const pageModules = import.meta.glob('/src/content/**/index.*.md', { eager: true })

// 2) Лоадеры Vue-компонентов md — НЕ eager (будем подгружать конкретную статью)
const markdownLoaders = import.meta.glob('/src/content/**/index.*.md')

// 3) Картинки для превью из фронтматтера
const assetModules = import.meta.glob(
    '/src/content/**/images/*.{png,jpg,jpeg,svg,gif,webp}',
    { as: 'url', eager: true }
)

// утилита: извлекаем { category, slug, locale } из полного пути
function parsePath(filePath) {
    // /src/content/<category>/<slug>/index.<locale>.md
    const m = filePath.match(/\/src\/content\/([^/]+)\/([^/]+)\/index\.([a-z-]+)\.md$/i)
    if (!m) return null
    const [, category, slug, locale] = m
    return { category, slug, locale }
}

// утилита: превратить относительный путь из фронтматтера в абсолютный URL
function resolveAssetUrl(mdFilePath, rel) {
    if (!rel || /^(https?:)?\/\//.test(rel) || rel.startsWith('/')) return rel
    // для index.<xx>.md убираем завершающее /index.xx.md
    const dir = mdFilePath.replace(/\/index\.[a-z-]+\.md$/i, '')
    const abs = `${dir}/${rel.replace(/^\.\//, '')}`
    return assetModules[abs] || rel
}

// Собираем массив статей (по всем языкам)
const articles = []

for (const filePath in pageModules) {
    const parsed = parsePath(filePath)
    if (!parsed) continue
    const { category, slug, locale } = parsed

    const mod = pageModules[filePath] || {}
    // метаданные — как у тебя было: mod.title / mod.description / mod.tags ...
    const title =
        mod.title ||
        mod.frontmatter?.title ||
        slug

    const description =
        mod.description ||
        mod.frontmatter?.description ||
        ''

    const tags =
        Array.isArray(mod.tags) ? mod.tags :
            Array.isArray(mod.frontmatter?.tags) ? mod.frontmatter.tags : []

    const github = mod.github || mod.frontmatter?.github || ''
    const demo   = mod.demo   || mod.frontmatter?.demo   || ''
    const preview = resolveAssetUrl(filePath, mod.preview || mod.frontmatter?.preview)

    const order = mod.order || mod.frontmatter?.order || 0

    articles.push({
        category,
        slug,
        locale,
        route: `/${category}/${slug}`, // чистый URL без языка
        title,
        description,
        tags,
        github,
        demo,
        preview,
        order
    })

    const grouped = {}
    for (const art of articles) {
        const key = `${art.category}/${art.slug}`
        if (!grouped[key]) grouped[key] = art

        // если нашли order — делаем его "общим"
        if (art.order && !grouped[key].__sharedOrder) {
            grouped[key].__sharedOrder = art.order
        }
    }

    // применяем общий order ко всем локалям
    for (const art of articles) {
        const key = `${art.category}/${art.slug}`
        art.order = grouped[key].__sharedOrder || 0
    }
}

// ------- Экспорт: геттеры и лоадер -------

// список статей по категории и локали (для списков)
export function getByCategory(category, locale) {
    return articles
        .filter(a => a.category === category && a.locale === locale)
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

// мета одной статьи по категории/слагу/локали (если нет этой локали — вернём fallback)
export function getArticleMeta(category, slug, locale, fallbacks = ['en']) {
    const exact = articles.find(a => a.category === category && a.slug === slug && a.locale === locale)
    if (exact) return exact
    for (const fb of fallbacks) {
        const hit = articles.find(a => a.category === category && a.slug === slug && a.locale === fb)
        if (hit) return hit
    }
    // последний шанс — любая доступная версия
    return articles.find(a => a.category === category && a.slug === slug) || null
}

// сам loader Vue-компонента для страницы
export function getArticleLoader(category, slug, locale, fallbacks = ['en']) {
    // ключ, как его видит import.meta.glob — ОБЯЗАТЕЛЬНО тот же формат пути
    const key = `/src/content/${category}/${slug}/index.${locale}.md`
    if (markdownLoaders[key]) return markdownLoaders[key]

    for (const fb of fallbacks) {
        const fbKey = `/src/content/${category}/${slug}/index.${fb}.md`
        if (markdownLoaders[fbKey]) return markdownLoaders[fbKey]
    }

    // любая доступная версия (берём первый попавшийся ключ по этому артикулу)
    const prefix = `/src/content/${category}/${slug}/index.`
    const any = Object.keys(markdownLoaders).find(k => k.startsWith(prefix))
    return any ? markdownLoaders[any] : null
}

export { articles }