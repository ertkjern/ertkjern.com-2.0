import {Footer} from '@/components/layout/footer'
import {CollapsiblePortableText} from '@/components/molecules/collapsible-portable-text'
import {LanguagePicker} from '@/components/molecules/lang-picker'
import {Link} from '@/i18n/routing'
import type {FooterProfile, ProjectPromoPage} from '@/sanity/queries'
import {PortableText} from '@portabletext/react'
import {urlFor} from '@/utils/sanity'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

interface Props {
  locale: string
  page: ProjectPromoPage
  footer?: FooterProfile | null
}

export const ProjectPromoPageLayout = ({locale, page, footer}: Props) => {
  const t = useTranslations('projectPage')
  const appImageUrl = page.headerImage ? urlFor(page.headerImage)?.url() : null
  const screenshots = (page.screenshots ?? []).flatMap((item, index) => {
    if (!item?.image?.asset?._ref) {
      return []
    }

    const url = urlFor(item.image)?.url()
    if (!url) {
      return []
    }

    const fallbackAlt = `${page.title ?? 'App'} screenshot ${index + 1}`
    return [{url, alt: item.altText?.trim() || fallbackAlt}]
  })
  const appStoreBadge = locale === 'no'
    ? '/images/ios/download_app_store_NO.svg'
    : '/images/ios/download_app_store_US.svg'
  const googlePlayBadge = locale === 'no'
    ? '/images/android/download_google_play_NO.svg'
    : '/images/android/download_google_play_EN.svg'

  return (
    <main className="min-h-screen bg-primary-bg-gray">
      <LanguagePicker currentLanguage={locale} />

      <div className="container mx-auto px-4 pb-24 pt-24">
        <Link
          href="/"
          locale={locale}
          className="mb-6 inline-block border-b-2 border-blue-700 pb-1 text-blue-700"
        >
          {t('backToHome')}
        </Link>

        <div className="space-y-8">
          <section className="rounded-lg bg-white p-6 shadow-primary md:p-8">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#0A5AC5] shadow-primary md:h-36 md:w-36">
                {appImageUrl ? (
                  <Image
                    src={appImageUrl}
                    alt={page.title ?? 'App icon'}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-2 text-center text-sm text-white">
                    {page.title}
                  </div>
                )}
              </div>

              <div className="flex min-h-24 min-w-0 flex-col justify-center md:min-h-36">
                <h1 className="text-2xl font-semibold leading-tight text-[#1d1d1f]">{page.title}</h1>
                {page.subtitle && (
                  <p className="mt-1 text-base font-normal text-[#6e6e73]">{page.subtitle}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {page.appStoreUrl && (
                    <a href={page.appStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={appStoreBadge}
                        alt={t('appStore')}
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </a>
                  )}
                  {page.googlePlayUrl && (
                    <a href={page.googlePlayUrl} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={googlePlayBadge}
                        alt={t('googlePlay')}
                        width={135}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {screenshots.length > 0 && (
            <section className="rounded-lg bg-white p-6 shadow-primary md:p-8">
              <div className="flex gap-6 overflow-x-auto pb-1">
                {screenshots.map((screenshot) => (
                  <div key={screenshot.url} className="shrink-0">
                    <div className="h-52 w-28 overflow-hidden rounded-[1.5rem] border-[5px] border-black bg-black shadow-primary md:h-64 md:w-32">
                      <Image
                        src={screenshot.url}
                        alt={screenshot.alt}
                        width={320}
                        height={680}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-lg bg-white p-6 shadow-primary md:p-8">
            <div className="space-y-10">
              <section>
                <h3 className="mb-3 text-2xl font-semibold text-[#1d1d1f]">{t('descriptionHeading')}</h3>
                <CollapsiblePortableText
                  value={page.description ?? []}
                  fadeClassName="via-white/95 to-white"
                  collapsedHeightClassName="max-h-[11rem]"
                  contentClassName="project-richtext"
                />
              </section>

              <section>
                <h4 className="mb-3 text-2xl font-semibold text-[#1d1d1f]">{t('termsOfUse')}</h4>
                <div className="block-content project-richtext text-[#1d1d1f]">
                  <PortableText value={page.termsOfUse ?? []} />
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-2xl font-semibold text-[#1d1d1f]">{t('privacyPolicy')}</h4>
                <div className="block-content project-richtext text-[#1d1d1f]">
                  <PortableText value={page.privacyPolicy ?? []} />
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>

      {footer?.footerTitle && footer.email && (
        <Footer title={footer.footerTitle} email={footer.email} />
      )}
    </main>
  )
}
