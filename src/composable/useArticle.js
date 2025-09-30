import { useI18n } from 'vue-i18n'
import { getByCategory, getArticleMeta, getArticleLoader } from '@/content'

export function useArticle() {
    const { locale } = useI18n()

    function list(category) {
        return getByCategory(category, locale.value)
    }

    function meta(category, slug) {
        return getArticleMeta(category, slug, locale.value, ['en'])
    }

    function loader(category, slug) {
        return getArticleLoader(category, slug, locale.value, ['en'])
    }

    return { list, meta, loader, locale }
}