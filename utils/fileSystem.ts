import fs from 'fs'
import path from 'path'
import { TreeItem } from '@/types/github'
import { generateSHA1 } from './hash'

export function getDirectoryStructure(dir: string, basePath: string = '', recursive: boolean = false): TreeItem[] {
    const items = fs.readdirSync(dir)

    return items
        .filter(item => !item.startsWith('.') && item !== 'node_modules')
        .map(item => {
            const fullPath = path.join(dir, item)
            const relativePath = path.join(basePath, item)
            const stats = fs.statSync(fullPath)
            const isDirectory = stats.isDirectory()

            const treeItem: TreeItem = {
                path: relativePath,
                mode: isDirectory ? '040000' : '100644',
                type: isDirectory ? 'tree' : 'blob',
                sha: generateSHA1(fullPath),
                url: `https://github.com/MuyleangIng/reactjs-with-dockerfile/blob/main/${relativePath}`,
            }

            if (!isDirectory) {
                treeItem.size = stats.size
            }

            if (isDirectory && recursive) {
                const children = getDirectoryStructure(fullPath, relativePath, recursive)
                return [treeItem, ...children]
            }

            return treeItem
        })
        .flat()
}

