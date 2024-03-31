import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  title: 'Profile',
  name: 'profile',
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'profilePicture',
      title: 'Profile picture',
      type: 'image',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutMe',
      title: 'About me',
      type: 'blockContent',
    }),
    defineField({
      name: 'cvIntroduction',
      title: 'CV Introduction',
      type: 'blockContent',
    }),
    defineField({
      name: 'productsIntroduction',
      title: 'Products Introduction',
      type: 'blockContent',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'workAndEducation',
      title: 'Work and Education',
      type: 'array',
      of: [{type: 'workAndEducation'}]
    }),
    defineField({
      name: 'footerTitle',
      title: 'Footer title',
      type: 'string',
    }),
  
  ],
})
