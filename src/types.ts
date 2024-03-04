export type CommentType = {
  postId?: number
  id: number
  name: string
  email?: string
  body: string
}

export type PostType = {
  title?: string | undefined
  body?: string | undefined
  id: number
  userId?: number
  comments?: CommentType[]
  isLink?: boolean
  className?: string
}
