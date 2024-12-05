'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TerminalPage() {
    const [activeTab, setActiveTab] = useState('kubernetes')
    const [displayedContent, setDisplayedContent] = useState<string[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)

    const tabs = [
        { id: 'kubernetes', label: 'Deploy on Kubernetes', content: [
                '$ kubectl create namespace my-app',
                'namespace/my-app created',
                '$ kubectl apply -f kubernetes-deployment.yaml',
                'deployment.apps/my-app created',
                '$ kubectl apply -f kubernetes-service.yaml',
                'service/my-app created',
                '$ kubectl get pods -n my-app',
                'NAME                     READY   STATUS    RESTARTS   AGE',
                'my-app-6d8f7b9c4-2nlzs   1/1     Running   0          30s',
                'my-app-6d8f7b9c4-9xq3t   1/1     Running   0          30s',
                '$ kubectl get services -n my-app',
                'NAME    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE',
                'my-app  ClusterIP   10.96.200.155   <none>        80/TCP    45s'
            ]},
        { id: 'docker', label: 'Deploy with Docker Compose', content: [
                '$ docker-compose --version',
                'docker-compose version 1.29.2, build 5becea4c',
                '$ cat docker-compose.yml',
                'version: "3.9"',
                'services:',
                '  web:',
                '    build: .',
                '    ports:',
                '      - "8000:5000"',
                '  redis:',
                '    image: "redis:alpine"',
                '$ docker-compose up -d',
                'Creating network "myapp_default" with the default driver',
                'Creating myapp_redis_1 ... done',
                'Creating myapp_web_1   ... done',
                '$ docker-compose ps',
                '    Name                   Command               State           Ports         ',
                '------------------------------------------------------------------------------',
                'myapp_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp              ',
                'myapp_web_1     flask run                        Up      0.0.0.0:8000->5000/tcp'
            ]},
        { id: 'monitor', label: 'Monitor', content: [
                '$ kubectl top nodes',
                'NAME           CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%   ',
                'minikube       250m         12%    1561Mi          40%       ',
                '$ kubectl top pods -n my-app',
                'NAME                     CPU(cores)   MEMORY(bytes)   ',
                'my-app-6d8f7b9c4-2nlzs   1m           10Mi            ',
                'my-app-6d8f7b9c4-9xq3t   1m           10Mi            ',
                '$ docker stats --no-stream',
                'CONTAINER ID   NAME         CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS',
                'a1b2c3d4e5f6   myapp_web_1    0.50%     28.91MiB / 1.952GiB   1.45%     1.45kB / 0B       0B / 0B           2',
                'f6e5d4c3b2a1   myapp_redis_1  0.10%     7.379MiB / 1.952GiB   0.37%     1.45kB / 0B       0B / 0B           4'
            ]},
    ]

    useEffect(() => {
        setDisplayedContent([])
        setCurrentLineIndex(0)
    }, [activeTab])

    useEffect(() => {
        const currentTab = tabs.find(tab => tab.id === activeTab)
        if (currentTab && currentLineIndex < currentTab.content.length) {
            const timer = setTimeout(() => {
                setDisplayedContent(prev => [...prev, currentTab.content[currentLineIndex]])
                setCurrentLineIndex(prev => prev + 1)
            }, 100) // Increased speed for better user experience

            return () => clearTimeout(timer)
        }
    }, [activeTab, currentLineIndex, tabs])

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Work with the Tools You Already Love
                </h2>
                <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {tabs.map((tab) => (
                            <TabsContent key={tab.id} value={tab.id} className="mt-0">
                                <div className="bg-gray-900 rounded-b-lg h-[500px] w-full">
                                    <ScrollArea className="h-full w-full rounded-b-md p-4">
                                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-all">
                                            {displayedContent.map((line, index) => (
                                                <div key={index} className="mb-2">
                                                    {line}
                                                </div>
                                            ))}
                                        </pre>
                                    </ScrollArea>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </section>
    )
}