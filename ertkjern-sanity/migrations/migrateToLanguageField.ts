import {migrateToLanguageField} from 'sanity-plugin-internationalized-array/migrations'

const DOCUMENT_TYPES: string[] = ['translation.metadata']
export default migrateToLanguageField(DOCUMENT_TYPES)