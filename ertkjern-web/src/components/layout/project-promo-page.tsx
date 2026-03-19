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
  const languagePickerHref = page.slug?.current ? `/apps/${page.slug.current}` : '/'
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
      <LanguagePicker currentLanguage={locale} href={languagePickerHref} />

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
              {appImageUrl ? (
                <Image
                  src={appImageUrl}
                  alt={page.title ?? 'App icon'}
                  width={144}
                  height={144}
                  className="block h-32 w-32 shrink-0 rounded-2xl object-cover shadow-primary md:h-40 md:w-40"
                  priority
                  sizes="(min-width: 768px) 10rem, 8rem"
                />
              ) : (
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-secondary-bg-gray px-2 text-center text-sm text-gray-600 shadow-primary md:h-40 md:w-40">
                  {page.title}
                </div>
              )}

              <div className="flex min-h-32 min-w-0 flex-col justify-center md:min-h-40">
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
                        sizes="120px"
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
                        sizes="135px"
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
                    <div className="w-[15.3rem] shadow-primary md:w-[17.1rem]">
                      <Image
                        src={screenshot.url}
                        alt={screenshot.alt}
                        width={800}
                        height={1680}
                        className="block h-auto w-full rounded-none"
                        sizes="(min-width: 768px) 17.1rem, 15.3rem"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-lg bg-white p-6 shadow-primary md:p-8">
            <div className="max-w-4xl space-y-6">
              <section>
                <h3 className="mb-4 text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                  {t('descriptionHeading')}
                </h3>
                <div className="mb-6">
                  <CollapsiblePortableText
                    value={page.description ?? []}
                    fadeClassName="via-white/95 to-white"
                    collapsedHeightClassName="max-h-[14rem]"
                    contentClassName="project-richtext"
                  />
                </div>
              </section>

              <section
                id="terms-of-use"
                className="scroll-mt-24 rounded-2xl bg-secondary-bg-gray/65 p-6 md:p-8"
              >
                <h4 className="mb-4 text-[1.8rem] font-semibold tracking-tight text-[#1d1d1f]">
                  {t('termsOfUse')}
                </h4>
                <div className="block-content project-richtext text-[#1d1d1f]">
                  <PortableText value={page.termsOfUse ?? []} />
                </div>
              </section>

              <section
                id="privacy-policy"
                className="scroll-mt-24 rounded-2xl bg-secondary-bg-gray/65 p-6 md:p-8"
              >
                <h4 className="mb-4 text-[1.8rem] font-semibold tracking-tight text-[#1d1d1f]">
                  {t('privacyPolicy')}
                </h4>
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
