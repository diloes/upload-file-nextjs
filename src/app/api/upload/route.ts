import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {
  try {
    // Lee el archivo
    const data = await request.formData()
    const file: any = data.get('file')

    // Guarda el archivo en memoria
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Escribelo
    const filePath = path.join(process.cwd(), 'public', file.name)
    writeFile(filePath, buffer)

    console.log('file uploaded to: ', filePath)

    // Retorna al cliente
    return new Response(JSON.stringify({ message: 'Uploaded file!' }))
  } catch (error) {
    return NextResponse.json(JSON.stringify({ message: 'No file provided!' }), { status: 400 })
  }
}
