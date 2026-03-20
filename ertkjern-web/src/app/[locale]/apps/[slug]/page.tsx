import {ProjectPromoPageLayout} from '@/components/layout/project-promo-page'
import {routing} from '@/i18n/routing'
import {getFooterProfile, getProjectPromoPage} from '@/sanity/queries'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

type Params = Promise<{locale: 'en' | 'no'; slug: string}>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const {locale, slug} = await params
  const page = await getProjectPromoPage(slug, locale)

  if (!page) {
    return {}
  }

  return {
    title: page.title ?? '',
    description: page.subtitle ?? '',
  }
}

export default async function ProjectPromoPage({
  params,
}: {
  params: Params
}) {
  const {locale, slug} = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const [page, footer] = await Promise.all([
    getProjectPromoPage(slug, locale),
    getFooterProfile(locale),
  ])

  if (!page) {
    notFound()
  }

  return <ProjectPromoPageLayout locale={locale} page={page} footer={footer} />
}
