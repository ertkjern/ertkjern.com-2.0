import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Facts',
    name: 'facts',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'facts',
        title: 'Facts',
        type: 'array',
        of: [{type: 'string'}],
      }),
    ],
  })
  