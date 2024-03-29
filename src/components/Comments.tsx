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
    queryFn: () => getComments(Number(id)),
  })

  if (commentsQuery.isLoading)
    return <div className="p-4 italic">Loading...</div>
  if (commentsQuery.isError)
    return <pre className="p-4 mono">{JSON.stringify(commentsQuery.error)}</pre>
  if (commentsQuery.data.length === 0)
    return <pre className="p-4 mono">No Comments</pre>

  return (
    <>
      <h3 className="font-bold text-sm">Comments:</h3>
      <div className="p-8 space-y-3">
        {commentsQuery.data.map((comm: CommentType) => {
          return <Comment key={comm.id} {...comm} />
        })}
      </div>
    </>
  )
}
