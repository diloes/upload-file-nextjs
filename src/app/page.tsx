'use client'

import Image from 'next/image'
import { useState } from 'react'

function HomePage() {
  const [file, setFile] = useState<File>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) return

    try {
      const dataF = new FormData()
      dataF.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: dataF
      })

      if (!res.ok) {
        console.log('file uploaded')
      }

      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='bg-zinc-950 p-5'>
        <h1 className='text-4xl text-center my-4'>Subir archivo</h1>
        <form onSubmit={handleSubmit}>
          <input
            className='bg-zinc-900 text-zinc-100 p-2 rounded block mb-2'
            type='file'
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <button
            className='bg-green-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50'
            disabled={!file}
          >
            Subir
          </button>

          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt='file'
              className='w-64 h-64 object-cover mx-auto mt-4'
              width={256}
              height={256}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default HomePage
