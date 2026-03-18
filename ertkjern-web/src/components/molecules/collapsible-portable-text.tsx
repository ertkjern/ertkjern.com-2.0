'use client'

import type {BlockContent} from '@/sanity/sanity.types'
import {PortableText} from '@portabletext/react'
import {useTranslations} from 'next-intl'
import {useState} from 'react'

interface Props {
  value: BlockContent
  fadeClassName?: string
  collapsedHeightClassName?: string
  contentClassName?: string
}

export const CollapsiblePortableText = ({
  value,
  fadeClassName = 'via-primary-bg-gray/90 to-primary-bg-gray',
  collapsedHeightClassName = 'max-h-[14rem]',
  contentClassName = '',
}: Props) => {
  const t = useTranslations('projectPage')
  const [expanded, setExpanded] = useState(false)

  if (!value?.length) {
    return null
  }

  return (
    <div>
      <div
        className={`block-content relative overflow-hidden transition-[max-height] duration-500 ${contentClassName} ${
          expanded ? 'max-h-[180rem]' : collapsedHeightClassName
        }`}
      >
        <PortableText value={value} />
        {!expanded && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent ${fadeClassName}`}
          />
        )}
      </div>

      <button
        type="button"
        className="mt-4 border-b-2 border-blue-700 pb-1 text-blue-700"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? t('showLess') : t('showMore')}
      </button>
    </div>
  )
}
