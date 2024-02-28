'use client'

import { useRef, useState } from 'react'
import { fakeCreatePost } from '@/utils'
import { useMutation } from '@tanstack/react-query'

export default function CreatePost() {
  const [err, setError] = useState({
    title: '',
    body: '',
  })
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLInputElement>(null)
  const createPostMutation = useMutation({
    mutationFn: fakeCreatePost,
  })

  const setValidation = (elements: any) => {
    let isValid = true
    const classError = 'border-red-600'

    Array.from(elements).forEach((element: any) => {
      if (element.hasAttribute('name')) {
        setError(prev => ({ ...prev, [element.name]: '' }))
        element.classList.remove(classError)

        const value = element ? element.value : ''
        const isValidValue = value !== '' && value.length < 250

        if (!isValidValue) {
          setError(prev => ({
            ...prev,
            [element.name]: 'Field has invalid value',
          }))
          element.classList.add(classError)
          isValid = false
        }
      }
    })

    return isValid
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const isValid = setValidation(e.target.elements)

    if (!isValid) return

    createPostMutation.mutate({
      title: titleRef?.current?.value,
      body: bodyRef?.current?.value,
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        action=""
        onSubmit={handleSubmit}
        className="rounded-lg p-4 bg-gray-800/80"
      >
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <input
              ref={titleRef}
              className="w-full sm:w-1/2 rounded-lg py-3 px-6 border-2 text-gray-900"
              type="text"
              name="title"
              placeholder="title"
            />
            {err.title !== '' && (
              <div className="flex-1">
                <span className="text-red-600 text-xs">{err.title}</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              ref={bodyRef}
              className="w-full sm:w-1/2 rounded-lg py-3 px-6 border-2 text-gray-900"
              type="text"
              name="body"
              placeholder="body"
            />
            {err.body !== '' && (
              <div className="flex-1">
                <span className="text-red-600 text-xs">{err.body}</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <button className="rounded-lg py-3 px-6 border-2 transition-colors hover:bg-gray-100 hover:text-gray-900">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
