import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedBlockContent',
  title: 'Localized block content',
  type: 'object',
  fields: [
    defineField({
      name: 'no',
      title: 'Norwegian',
      type: 'blockContent',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
  ],
})
