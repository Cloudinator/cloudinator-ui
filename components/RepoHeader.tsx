// 'use client'
//
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { FaCode, FaExclamationCircle, FaPlayCircle, FaProjectDiagram, FaShieldAlt, FaBook } from 'react-icons/fa'
// import { GoGitPullRequest, GoIssueOpened } from 'react-icons/go'
//
// export default function RepoHeader() {
//     const pathname = usePathname()
//
//     return (
//         <div className="border-b">
//             <div className="flex items-center gap-4 py-4">
//                 <h1 className="text-xl font-semibold flex items-center gap-2">
//                     <Link href="/" className="hover:underline">MuyleangIng/reactjs-with-dockerfile</Link>
//                     <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Public</span>
//                 </h1>
//             </div>
//             <nav className="flex -mb-px">
//                 <NavItem icon={<FaCode />} text="Code" href="/" active={pathname === '/'} />
//                 <NavItem icon={<GoIssueOpened />} text="Issues" href="/issues" count={0} />
//                 <NavItem icon={<GoGitPullRequest />} text="Pull requests" href="/pulls" count={0} />
//                 <NavItem icon={<FaPlayCircle />} text="Actions" href="/actions" />
//                 <NavItem icon={<FaProjectDiagram />} text="Projects" href="/projects" />
//                 <NavItem icon={<FaBook />} text="Wiki" href="/wiki" />
//                 <NavItem icon={<FaShieldAlt />} text="Security" href="/security" />
//                 <NavItem icon={<FaExclamationCircle />} text="Insights" href="/insights" />
//             </nav>
//         </div>
//     )
// }
//
// function NavItem({
//                      icon,
//                      text,
//                      href,
//                      count,
//                      active
//                  }: {
//     icon: React.ReactNode
//     text: string
//     href: string
//     count?: number
//     active?: boolean
// }) {
//     return (
//         <Link
//             href={href}
//             className={`
//         flex items-center gap-2 px-4 py-2 border-b-2 text-sm font-medium
//         ${active
//                 ? 'border-orange-500 text-gray-900'
//                 : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
//       `}
//         >
//             {icon}
//             {text}
//             {count !== undefined && (
//                 <span className="ml-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
//           {count}
//         </span>
//             )}
//         </Link>
//     )
// }
//
'use client'

import { Button } from "@/components/ui/button"
import { Code, GitPullRequest, CircleDot, Play, Shield, Book, Info } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function RepoHeader() {
    const pathname = usePathname()
    const isRootPath = pathname === '/test-github'

    return (
        <div className="border-b pb-3">
            <div className="flex items-center gap-4 mb-4">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                    <Link href="/test-github" className="hover:underline">
                        Muyleanging/reactjs-with-dockerfile
                    </Link>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100">Public</span>
                </h1>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Button variant="ghost" size="sm" className={isRootPath ? "bg-gray-100" : ""}>
                    <Code className="w-4 h-4 mr-2" />
                    Code
                </Button>
                <Button variant="ghost" size="sm">
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Pull requests
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100">0</span>
                </Button>
                <Button variant="ghost" size="sm">
                    <CircleDot className="w-4 h-4 mr-2" />
                    Issues
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100">0</span>
                </Button>
                <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Actions
                </Button>
                <Button variant="ghost" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                </Button>
                <Button variant="ghost" size="sm">
                    <Book className="w-4 h-4 mr-2" />
                    Wiki
                </Button>
                <Button variant="ghost" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    Insights
                </Button>
            </div>
        </div>
    )
}

