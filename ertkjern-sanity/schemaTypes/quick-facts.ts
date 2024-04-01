import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Quick facts',
  name: 'quickFacts',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'facts',
      title: 'Facts',
      type: 'array',
      of: [{type: 'facts'}],
    }),
  ],
})
