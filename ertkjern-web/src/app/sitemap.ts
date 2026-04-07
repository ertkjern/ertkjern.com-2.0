import {routing} from '@/i18n/routing'
import {getProjectPromoPageSlugs} from '@/sanity/queries'
import type {MetadataRoute} from 'next'

const baseUrl = 'https://www.ertkjern.no'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectPages = await getProjectPromoPageSlugs()
  const uniqueProjectPages = Array.from(
    new Map(
      projectPages
        .filter((page) => Boolean(page.slug))
        .map((page) => [page.slug, page]),
    ).values(),
  )

  const localeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
  }))

  const projectEntries: MetadataRoute.Sitemap = uniqueProjectPages.flatMap(
    ({slug, updatedAt}) =>
      routing.locales.map((locale) => ({
        url: `${baseUrl}/${locale}/apps/${slug}`,
        lastModified: updatedAt,
      })),
  )

  return [...localeEntries, ...projectEntries]
}
