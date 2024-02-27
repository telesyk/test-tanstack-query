'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()

  return (
    <nav className="p-16 flex justify-center gap-6">
      {path !== '/' && <Link href="/">Home</Link>}
      <Link href="11">Single Post</Link>
    </nav>
  )
}
