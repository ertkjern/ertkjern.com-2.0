import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'ertkjern2.0',

  projectId: 'b1kzmfwp',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    //googleMapsInput(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'no', title: 'Norwegian'},
        {id: 'en', title: 'English'}
      ],
      schemaTypes: ['profile'],
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
