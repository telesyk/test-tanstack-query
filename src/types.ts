export type CommentType = {
  id: number
  name: string
  body: string
  postId?: number
  email?: string
}

export type PostType = {
  id: number
  title: string | undefined
  body: string | undefined
  userId?: number
  comments?: CommentType[]
  isLink?: boolean
  className?: string
}

export type UserType = {
  id: number
  name: string
  username?: string
  email: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo?: {
      lat: string
      lng: string
    }
  }
  phone?: string
  website: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export type DataType = {
  posts: PostType[]
  users: UserType[]
  comments: CommentType[]
}
