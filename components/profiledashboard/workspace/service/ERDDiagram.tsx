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

type SpringProjectType = {
    uuid: string;
    name: string;
    folder: string;
    group: string;
    dependencies: string[];
}

interface ERDDiagramProps {
    projects: SpringProjectType[]
}

const ERDDiagram: React.FC<ERDDiagramProps> = ({ projects }) => {
    const initialNodes: Node[] = projects.map((project, index) => ({
        id: project.uuid,
        data: { label: project.name },
        position: { x: 250 * (index % 3), y: 100 * Math.floor(index / 3) },
        type: 'default',
    }))

    const initialEdges: Edge[] = []
    projects.forEach((project) => {
        if (project.dependencies.includes('amqp')) {
            projects.forEach((otherProject) => {
                if (project.uuid !== otherProject.uuid && otherProject.dependencies.includes('amqp')) {
                    initialEdges.push({
                        id: `${project.uuid}-${otherProject.uuid}`,
                        source: project.uuid,
                        target: otherProject.uuid,
                        animated: true,
                        label: 'AMQP',
                    })
                }
            })
        }
    })

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    )

    return (
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
    )
}

export default ERDDiagram

