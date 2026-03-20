import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'screenshotItem',
  title: 'Screenshot',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the screenshot for accessibility.',
    }),
  ],
})
