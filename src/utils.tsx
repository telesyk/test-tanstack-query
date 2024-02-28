import { CommentType, PostType } from './types'

const lsDB = 'testPostsDB'

export const getAll: any = async () => {
  try {
    const data = await import('./db.json')
    if (!localStorage.getItem(lsDB)) {
      localStorage.setItem(lsDB, JSON.stringify(data.default))
    }
    const lsData = localStorage.getItem(lsDB) || ''
    return JSON.parse(lsData)
  } catch (error) {
    console.error(error)
  }
}

export const getPosts = async () => {
  try {
    const { posts } = await getAll()
    return posts
  } catch (error) {
    console.error(error)
  }
}

export const getPost = async (id: number) => {
  try {
    const posts = await getPosts()
    return posts?.find((post: PostType) => post.id === id)
  } catch (error) {
    console.error(error)
  }
}

export const getComments = async (postId: number) => {
  try {
    const { comments } = await getAll()
    return comments.filter((comm: CommentType) => comm.postId === postId)
  } catch (error) {
    console.error(error)
  }
}

export const createPost = async ({ title, body }: PostType) => {
  const data = await getAll()
  const newPost = {
    body,
    title,
    id: Date.now(),
    userId: 1,
  }
  data.posts.push(newPost)
  const updatedData = {
    ...data,
    posts: data.posts,
  }
  localStorage.setItem(lsDB, JSON.stringify(updatedData))

  return data.posts
}
