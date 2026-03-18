import {client} from '@/sanity/client'
import type {BlockContent, Profile, Project, Slug} from '@/sanity/sanity.types'

type SanityImage = Project['logo'] | Profile['profilePicture']

export interface ProjectPromoPageReference {
  title?: string
  slug?: Slug
}

export interface HomeProject extends Omit<Project, 'url'> {
  _key: string
  url?: string
  promoPage?: ProjectPromoPageReference | null
}

export interface HomeProfile {
  name?: string
  title?: string
  profilePicture?: SanityImage
  aboutMe?: BlockContent
  cvIntroduction?: BlockContent
  quickFacts?: Profile['quickFacts']
  workAndEducation?: Profile['workAndEducation']
  projectsDescription?: BlockContent
  projects?: HomeProject[]
  email?: string
  footerTitle?: string
  metaTitle?: string
  metaDescription?: string
}

export interface ProjectPromoPage {
  title?: string
  slug?: Slug
  subtitle?: string
  headerImage?: SanityImage
  screenshots?: Array<{
    image?: SanityImage
    altText?: string
  }>
  description?: BlockContent
  appStoreUrl?: string
  googlePlayUrl?: string
  termsOfUse?: BlockContent
  privacyPolicy?: BlockContent
}

export interface FooterProfile {
  email?: string
  footerTitle?: string
}

const homeProfileQuery = `*[_type == "profile" && language == $locale][0]{
  name,
  title,
  profilePicture,
  aboutMe,
  cvIntroduction,
  quickFacts,
  workAndEducation,
  projectsDescription,
  projects[]{
    _key,
    title,
    description,
    bulletPoints,
    logo,
    url,
    promoPage->{
      "title": coalesce(title[$locale], title.en, title.no),
      slug
    }
  },
  email,
  footerTitle,
  metaTitle,
  metaDescription
}`

const footerProfileQuery = `*[_type == "profile" && language == $locale][0]{
  email,
  footerTitle
}`

const projectPromoPageQuery = `*[_type == "projectPage" && slug.current == $slug][0]{
  "title": coalesce(title[$locale], title.en, title.no),
  slug,
  "subtitle": coalesce(subtitle[$locale], subtitle.en, subtitle.no),
  headerImage,
  "screenshots": coalesce(screenshots[$locale], screenshots.en, screenshots.no, [])[]{
    altText,
    image
  },
  "description": coalesce(description[$locale], description.en, description.no),
  appStoreUrl,
  googlePlayUrl,
  "termsOfUse": coalesce(termsOfUse[$locale], termsOfUse.en, termsOfUse.no),
  "privacyPolicy": coalesce(privacyPolicy[$locale], privacyPolicy.en, privacyPolicy.no)
}`

export const getHomeProfile = async (locale: string) =>
  client.fetch<HomeProfile | null>(homeProfileQuery, {locale})

export const getFooterProfile = async (locale: string) =>
  client.fetch<FooterProfile | null>(footerProfileQuery, {locale})

export const getProjectPromoPage = async (slug: string, locale: string) =>
  client.fetch<ProjectPromoPage | null>(projectPromoPageQuery, {slug, locale})
