export type CommentType = {
  postId?: number
  id: number
  name: string
  email?: string
  body: string
}

export type PostType = {
  title: string
  body: string
  id: number
  userId?: number
  comments?: CommentType[]
  isLink?: boolean
}
