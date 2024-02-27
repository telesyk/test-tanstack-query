import React from 'react'
import { CommentType } from '@/types'

export default function Comment({ name, body }: CommentType) {
  return (
    <div className="flex-auto text-sm p-4 space-y-2 rounded-lg odd:ml-8 even:mr-8 odd:bg-sky-800/30 even:bg-gray-500/20">
      <div className="font-bold">{name}</div>
      <div className="text-xs">{body}</div>
    </div>
  )
}
