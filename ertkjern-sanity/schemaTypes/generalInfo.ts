import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'General Info',
  name: 'generalInfo',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'bulletPoints',
      type: 'array',
      of: [{type: 'string'}],
    }),
   
  ],
})
