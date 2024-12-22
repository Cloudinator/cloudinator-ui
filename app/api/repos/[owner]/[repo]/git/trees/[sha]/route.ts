// import { NextRequest, NextResponse } from 'next/server'
// import path from 'path'
// import fs from 'fs/promises'
//
// export async function GET(
//     request: NextRequest,
//     context: { params: { owner: string; repo: string; sha: string } }
// ) {
//     const params = await Promise.resolve(context.params)
//     const { owner, repo, sha } = params
//
//     try {
//         const rootDir = process.cwd()
//         const tree = await getDirectoryStructure(rootDir)
//
//         return NextResponse.json({
//             sha,
//             url: `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}`,
//             tree,
//             truncated: false
//         })
//     } catch (error) {
//         console.error('API Error:', error)
//         return NextResponse.json(
//             { message: 'Failed to fetch repository data' },
//             { status: 500 }
//         )
//     }
// }
//
// async function getDirectoryStructure(dir: string, base = ''): Promise<any[]> {
//     const files = await fs.readdir(dir, { withFileTypes: true })
//     const tree = []
//
//     for (const file of files) {
//         if (file.name.startsWith('.') || file.name === 'node_modules') continue
//
//         const relativePath = path.join(base, file.name).replace(/\\/g, '/')
//         const fullPath = path.join(dir, file.name)
//         const stats = await fs.stat(fullPath)
//
//         const item = {
//             path: relativePath,
//             mode: '100644',
//             type: file.isDirectory() ? 'tree' : 'blob',
//             sha: stats.size.toString(16),
//             size: stats.size,
//             url: `https://api.github.com/repos/owner/repo/git/blobs/${stats.size.toString(16)}`,
//             lastCommit: {
//                 message: 'Initialize project using Create React App',
//                 date: '7 months ago'
//             }
//         }
//
//         tree.push(item)
//
//         if (file.isDirectory()) {
//             const subtree = await getDirectoryStructure(fullPath, relativePath)
//             tree.push(...subtree)
//         }
//     }
//
//     return tree
// }
//
