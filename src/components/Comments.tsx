import { useQuery } from '@tanstack/react-query'
import { getComments } from '@/utils'
import Comment from './Comment'
import { CommentType } from '@/types'

type Props = {
  id: number | string
}

export default function Comments({ id }: Props) {
  const commentsQuery = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  })

  if (commentsQuery.isLoading)
    return <div className="p-4 italic">Loading...</div>
  if (commentsQuery.isError)
    return <pre className="p-4 mono">{JSON.stringify(commentsQuery.error)}</pre>

  return (
    <div className="p-8 space-y-3">
      {commentsQuery.data.map((comm: CommentType) => {
        console.log(comm)
        return <Comment key={comm.id} {...comm} />
      })}
    </div>
  )
}
