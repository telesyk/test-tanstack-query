import { CommentType, PostType } from './types'

const lsDB = 'testPostsDB'

export async function getAll(): Promise<any> {
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

export async function getPosts() {
  try {
    const { posts } = await getAll()
    return posts as PostType[]
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

export const getInfinitPosts = async (param: number) => {
  const LIMIT = 5
  const pageStart = param - 1
  const pageEnd = param * LIMIT
  const allPosts = await getPosts()
  const pageData = allPosts ? allPosts.slice(pageStart, pageEnd) : []

  return {
    nextPage: pageData.length < 5 ? undefined : param + 1,
    posts: pageData,
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

export const getUser = async (userId: number) => {
  try {
    const { users } = await getAll()
    return users.filter((user: any) => user.id === userId)[0]
  } catch (error) {
    console.error(error)
  }
}

export const createPost = async (postProps: PostType) => {
  const data = await getAll()
  const newPost = {
    ...postProps,
  }
  data.posts.push(newPost)
  const updatedData = {
    ...data,
    posts: data.posts,
  }
  localStorage.setItem(lsDB, JSON.stringify(updatedData))

  return data.posts
}
