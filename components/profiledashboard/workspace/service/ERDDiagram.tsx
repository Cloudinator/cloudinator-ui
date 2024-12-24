"use client"

import React, { useCallback } from 'react'
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    ConnectionMode,
} from 'reactflow'
import 'reactflow/dist/style.css'

type ProjectType = {
    uuid: string;
    name: string;
    branch: string;
    namespace: string;
    git: string;
}

interface ERDDiagramProps {
    projects: ProjectType[]
}

const ERDDiagram: React.FC<ERDDiagramProps> = ({ projects }) => {
    const initialNodes: Node[] = projects.map((project, index) => ({
        id: project.uuid,
        data: { label: project.name },
        position: { x: 250 * (index % 3), y: 100 * Math.floor(index / 3) },
        type: 'default',
    }))

    const initialEdges: Edge[] = []
    projects.forEach((project, index) => {
        if (index < projects.length - 1) {
            initialEdges.push({
                id: `${project.uuid}-${projects[index + 1].uuid}`,
                source: project.uuid,
                target: projects[index + 1].uuid,
                animated: true,
                label: 'Connected',
            })
        }
    })

    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    )

    return (
        <div style={{ width: '100%', height: '600px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionMode={ConnectionMode.Loose}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default ERDDiagram

