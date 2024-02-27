import React from 'react'

type Props = {
  title: string
  body: string
}

export default function Post({ title, body }: Props) {
  return (
    <div className="p-4 capitalize space-y-3">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-xs opacity-80">{body}</div>
    </div>
  )
}
