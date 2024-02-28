import { API } from './constants'
import { PostType } from './types'

function testWait() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

export const getPosts = async () => {
  try {
    const { posts } = await import('./db.json')
    return posts
  } catch (error) {
    console.error(error)
  }
}

export const getPost = async (id: string | number) => {
  try {
    const posts = await getPosts()
    return posts?.find((post: PostType) => post.id === id)
  } catch (error) {
    console.error(error)
  }
}

export const getComments = async (postId: string | number) => {
  try {
    const res = await fetch(`${API.comments}?postId=${postId}`)
    if (!res.ok) throw new Error(`Faild to get post ${postId} comments`)
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export const fakeCreatePost = async ({ title, body }: PostType) => {
  const posts = await getPosts()
  const newPost = {
    body,
    title,
    id: Date.now(),
    userId: 1,
  }

  console.log(newPost)
  return [...posts, newPost]
}
// testWait().then(() =>
//   POSTS.find((post: { id: string | number }) => post.id === id)
// )
