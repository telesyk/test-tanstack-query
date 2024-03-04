'use client'

import { useQuery } from '@tanstack/react-query'
import { Post } from '@/components'
import { KEY_POSTS } from '@/constants'
import { getPosts } from '@/utils'
import { PostType } from '@/types'

export default function Home() {
  const postsQuery = useQuery({
    queryKey: [KEY_POSTS],
    queryFn: getPosts,
  })

  if (postsQuery.isLoading)
    return <div className="py-16 text-center font-mono text-xl">Loading...</div>

  if (postsQuery.isError)
    return (
      <pre className="py-16 text-center font-mono">
        {JSON.stringify(postsQuery.error)}
      </pre>
    )

  const dataReversed = [...postsQuery.data].reverse()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      <h1 className="text-4xl">TanStack Query</h1>
      <div className="my-8 rounded-xl p-8 bg-gray-200 dark:bg-zinc-700 text-zinc-700 dark:text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dataReversed.map((post: PostType) => (
            <Post key={post.id} isLink={true} {...post} />
          ))}
        </div>
      </div>
    </main>
  )
}
