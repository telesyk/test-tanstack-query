import React from 'react'
import { CommentType } from '@/types'

export default function Comment({ name, body, email }: CommentType) {
  return (
    <div className="flex-auto text-sm p-4 space-y-2 rounded-lg odd:ml-8 even:mr-8 odd:bg-sky-800/30 even:bg-gray-500/20">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
        <div className="flex-1 basis-3/5 font-bold">{name}</div>
        <div className="flex-auto basis-2/5 text-right text-xs opacity-75">
          {email}
        </div>
      </div>
      <div className="text-xs">{body}</div>
    </div>
  )
}
