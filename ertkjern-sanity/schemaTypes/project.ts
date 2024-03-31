import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Project',
  name: 'project',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
    }),
  ],
})
