'use client'

import { KEY_POSTS } from '@/constants'
import { getPost } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Post, Comments, PostUser } from '@/components'

type Props = {
  postId: string
}

export default function SinglePost({ params: { postId } }: { params: Props }) {
  const postQuery = useQuery({
    queryKey: [KEY_POSTS, postId],
    queryFn: () => getPost(Number(postId)),
  })

  if (postQuery.isLoading) return <div className="p-4 italic">Loading...</div>
  if (postQuery.isError)
    return <pre className="p-4 mono">{JSON.stringify(postQuery.error)}</pre>

  return (
    <div className="mx-auto max-w-2xl">
      <Post {...postQuery.data} />
      <PostUser userId={postQuery.data.userId} />
      <Comments id={postId} />
    </div>
  )
}
