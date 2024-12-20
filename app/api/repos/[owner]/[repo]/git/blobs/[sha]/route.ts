import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
    request: NextRequest,
    { params }: { params: { owner: string; repo: string; sha: string } }
) {
    try {
        // In a real implementation, you would fetch the file content from GitHub's API
        // For demo purposes, we'll read from the local file system
        const rootDir = process.cwd()
        const filePath = path.join(rootDir, 'src', params.sha)
        const content = await fs.readFile(filePath, 'utf-8')

        return NextResponse.json({
            sha: params.sha,
            content,
            encoding: 'utf-8',
            size: content.length,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

