import { API, POSTS } from './constants'

function testWait() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

export const getPosts = async () => {
  try {
    const res = await fetch(API.posts)
    if (!res.ok) throw new Error('Faild to get data')
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export const getPost = async (id: string | number) => {
  try {
    const res = await fetch(`${API.posts}/${id}`)
    if (!res.ok) throw new Error(`Faild to get post ${id} data`)
    return res.json()
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
// testWait().then(() =>
//   POSTS.find((post: { id: string | number }) => post.id === id)
// )
