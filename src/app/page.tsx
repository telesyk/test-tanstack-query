'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '@/components'

const POSTS: any = [
  {
    id: 10,
    title: 'optio molestias id quia eum',
    body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
  },
  {
    id: 11,
    title: 'et ea vero quia laudantium autem',
    body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
  },
]
const NEW_POST = {
  title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  body: 'Nemo consequatur rem cum, tenetur blanditiis fugit commodi accusantium est aliquid iusto quaerat dolorum totam quos, velit eaque minima, quidem non aspernatur.',
}

export default function Home() {
  // console.log(POSTS)
  const queryClient = useQueryClient()
  const postsQuery = useQuery({
    queryKey: ['posts'],
    // queryFn: () => Promise.reject('Error message'),
    queryFn: () => testWait().then(() => [...POSTS]),
  })

  const newPostMutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: (post: any) =>
      testWait().then(() =>
        POSTS.push({
          ...post,
          id: crypto.randomUUID(),
        })
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  if (postsQuery.isLoading)
    return <div className="py-16 text-center font-mono text-xl">Loading...</div>

  if (postsQuery.isError)
    return (
      <pre className="py-16 text-center font-mono">
        {JSON.stringify(postsQuery.error)}
      </pre>
    )

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      <h1 className="text-4xl">TanStack Query</h1>
      <div className="my-8 rounded-xl p-8 bg-gray-200 dark:bg-zinc-700 text-zinc-700 dark:text-gray-100">
        <button
          className="py-3 px-8 border-2 border-amber-700 rounded-lg bg-amber-500 dark:bg-amber-600 disabled:opacity-80"
          disabled={newPostMutation.isPending}
          onClick={() => newPostMutation.mutate(NEW_POST)}
        >
          {newPostMutation.isPending ? 'Loading' : 'Add new'}
        </button>
        <div className="grid grid-cols-2 gap-4">
          {postsQuery?.data?.map(post => <Post key={post.id} {...post} />)}
        </div>
      </div>
    </main>
  )
}

function testWait() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}
