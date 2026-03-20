import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Project',
  name: 'project',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      media: 'logo',
      subtitle: 'promoPage.slug.current',
    },
    prepare({title, media, subtitle}) {
      return {
        title: title || 'Untitled project',
        media,
        subtitle: subtitle ? `Promo page: /${subtitle}` : 'No promo page',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
    }),
    defineField({
      name: 'promoPage',
      title: 'Promo page',
      description:
        'Optional landing page for this project. Add this only when the project should have its own promo page.',
      type: 'reference',
      to: [{type: 'projectPage'}],
    }),
  ],
})
