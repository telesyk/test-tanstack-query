'use client'

import { KEY_POSTS } from '@/constants'
import { getUser } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

type Props = {
  userId: number
}

export default function PostUser({ userId }: Props) {
  const userQuery = useQuery({
    queryKey: [KEY_POSTS, userId],
    queryFn: () => getUser(Number(userId)),
  })

  if (userQuery.isLoading) return <div className="p-4 italic">Loading...</div>
  if (userQuery.isError)
    return <pre className="p-4 mono">{JSON.stringify(userQuery.error)}</pre>

  const { data } = userQuery

  return (
    <div className="my-4 p-4 rounded-lg bg-gray-500/50 text-sm">
      <div className="flex gap-3">
        <div className="flex-1">
          <span className="italic">Author: </span>
          <code>{data.name}</code>
        </div>
        {data.email && (
          <Link title="Email" href={`mailto:${data.email}`}>
            📨
          </Link>
        )}
        {data.website && (
          <Link title="Website" href={data.website}>
            🌐
          </Link>
        )}
      </div>
    </div>
  )
}
