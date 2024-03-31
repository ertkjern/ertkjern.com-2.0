import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Work and Education',
  name: 'workAndEducation',
  type: 'object',
  fields: [
    defineField({
        name: 'type',
        title: 'What is this?',
        type: 'string',
        options: {
          list: [
            {title: 'Work', value: 'work'},
            {title: 'Education', value: 'education'},
          ],
          layout: 'radio',
        },
      }),
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
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
    }),
    defineField({
        name: 'bulletPoints',
        title: 'Bullet points',
        type: 'array',
        of: [{type: 'string'}],
      }),
    defineField({
      name: 'url',
      title: 'Link to work or education',
      type: 'string',
    }),
  ],
})
