import React from 'react'
import { PostType } from '@/types'
import Link from 'next/link'

export default function Post({
  title,
  body,
  id,
  isLink,
  className = '',
}: PostType) {
  return (
    <div className={`p-4 capitalize space-y-3 ${className}`}>
      <div className="text-xl font-bold">
        {isLink && id ? <Link href={id.toString()}>{title}</Link> : title}
      </div>
      <div className="text-xs opacity-80">{body}</div>
    </div>
  )
}
