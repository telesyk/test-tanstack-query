'use client'

import { useQuery, useMutation } from '@tanstack/react-query'

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
  console.log(POSTS)
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className="text-4xl">TanStack Query</h1>
      <div className="my-8 rounded-xl p-8 bg-gray-200 dark:bg-zinc-700 text-zinc-700 dark:text-gray-100">
        <div className="space-y-4">
          {postsQuery?.data?.map(post => (
            <div key={post.id} className="p-4 capitalize">
              <div className="text-2xl font-bold">{post.title}</div>
              <div className="text-sm opacity-80">{post.body}</div>
            </div>
          ))}
          <button onClick={() => newPostMutation.mutate(NEW_POST)}>
            Add new
          </button>
        </div>
      </div>
    </main>
  )
}

function testWait() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}
