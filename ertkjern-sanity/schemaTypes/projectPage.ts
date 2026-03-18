import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdWeb as icon} from 'react-icons/md'

type LocalizedStringValue = {no?: string; en?: string} | undefined
type LocalizedBlockContentValue = {no?: unknown[]; en?: unknown[]} | undefined
type LocalizedScreenshotsValue =
  | {
      no?: Array<{image?: {_type?: 'image'; asset?: {_ref?: string}}; altText?: string}>
      en?: Array<{image?: {_type?: 'image'; asset?: {_ref?: string}}; altText?: string}>
    }
  | undefined

export default defineType({
  title: 'Project Page',
  name: 'projectPage',
  icon,
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'},
    {name: 'stores', title: 'Stores'},
    {name: 'legal', title: 'Legal'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'hero',
      validation: (Rule) => Rule.required().custom((value) => {
        const localizedValue = value as LocalizedStringValue
        if (!localizedValue?.en) {
          return 'English title is required'
        }

        return true
      }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the public URL of the promo page.',
      group: 'seo',
      options: {
        source: (document) => {
          const localizedTitle = (document as {title?: {en?: string; no?: string}})?.title
          return localizedTitle?.en ?? localizedTitle?.no ?? ''
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Header image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      group: 'hero',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedBlockContent',
      group: 'content',
      validation: (Rule) => Rule.required().custom((value) => {
        const localizedValue = value as LocalizedBlockContentValue
        if (!localizedValue?.en?.length) {
          return 'English description is required'
        }

        return true
      }),
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      description:
        'Localized screenshots used in the horizontal app preview row.',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'no',
          title: 'Norwegian',
          type: 'array',
          of: [defineArrayMember({type: 'screenshotItem'})],
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [defineArrayMember({type: 'screenshotItem'})],
        }),
      ],
      validation: (Rule) => Rule.required().custom((value) => {
        const localizedValue = value as LocalizedScreenshotsValue
        const englishScreenshots = localizedValue?.en ?? []

        if (englishScreenshots.length < 1) {
          return 'At least one English screenshot is required'
        }

        const hasMissingImage = englishScreenshots.some((item) => !item?.image?.asset?._ref)
        if (hasMissingImage) {
          return 'Each English screenshot must include an image'
        }

        return true
      }),
    }),
    defineField({
      name: 'appStoreUrl',
      title: 'App Store URL',
      type: 'url',
      group: 'stores',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'googlePlayUrl',
      title: 'Google Play URL',
      type: 'url',
      description: 'Optional. Leave empty if the app is iOS-only.',
      group: 'stores',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'termsOfUse',
      title: 'Terms of use',
      type: 'localizedBlockContent',
      group: 'legal',
      validation: (Rule) => Rule.required().custom((value) => {
        const localizedValue = value as LocalizedBlockContentValue
        if (!localizedValue?.en?.length) {
          return 'English terms of use is required'
        }

        return true
      }),
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy policy',
      type: 'localizedBlockContent',
      group: 'legal',
      validation: (Rule) => Rule.required().custom((value) => {
        const localizedValue = value as LocalizedBlockContentValue
        if (!localizedValue?.en?.length) {
          return 'English privacy policy is required'
        }

        return true
      }),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'slug.current',
      media: 'headerImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        media,
        subtitle: subtitle ? `/${subtitle}` : 'Missing slug',
      }
    },
  },
  
})
