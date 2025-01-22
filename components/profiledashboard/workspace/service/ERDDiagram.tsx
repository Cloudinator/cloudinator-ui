"use client";

import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
    Node,
    Edge,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";

type ProjectType = {
    uuid: string;
    name: string;
    branch: string;
    namespace: string;
    git: string;
};

interface ERDDiagramProps {
    projects: ProjectType[];
}

const ERDDiagram: React.FC<ERDDiagramProps> = ({ projects }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default to dark mode

    // Detect system theme
    useEffect(() => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        setTheme(systemTheme);

        const themeListener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light");
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", themeListener);

        return () => mediaQuery.removeEventListener("change", themeListener);
    }, []);

    // Define colors for light and dark modes
    const colors = {
        light: {
            nodeBackground: "linear-gradient(145deg, #e0e0e0, #f5f5f5)",
            nodeBorder: "#ccc",
            nodeText: "#333",
            edgeStroke: "#666",
            edgeLabel: "#666",
            edgeLabelBg: "#f5f5f5",
            background: "#f5f5f5",
            gridColor: "#ddd",
            controlsBg: "#fff",
            controlsBorder: "#ccc",
            controlsButtonBg: "#fff",
            controlsButtonText: "#666",
        },
        dark: {
            nodeBackground: "linear-gradient(145deg, #6e48aa, #9d50bb)",
            nodeBorder: "#6e48aa",
            nodeText: "#fff",
            edgeStroke: "#6e48aa",
            edgeLabel: "#6e48aa",
            edgeLabelBg: "#1e1e1e",
            background: "#1e1e1e",
            gridColor: "#444",
            controlsBg: "#1e1e1e",
            controlsBorder: "#6e48aa",
            controlsButtonBg: "#1e1e1e",
            controlsButtonText: "#6e48aa",
        },
    };

    const currentColors = colors[theme];

    // Custom node style
    const nodeStyle = {
        background: currentColors.nodeBackground,
        color: currentColors.nodeText,
        border: `2px solid ${currentColors.nodeBorder}`,
        borderRadius: "10px",
        boxShadow: `0 0 10px ${currentColors.nodeBorder}, 0 0 20px ${currentColors.nodeBorder}`,
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "bold",
    };

    // Custom edge style
    const edgeStyle = {
        stroke: currentColors.edgeStroke,
        strokeWidth: 2,
        strokeDasharray: "5 5",
        animation: "dashdraw 0.5s linear infinite",
    };

    // Initial nodes with custom style
    const initialNodes: Node[] = projects.map((project, index) => ({
        id: project.uuid,
        data: { label: project.name },
        position: { x: 250 * (index % 3), y: 100 * Math.floor(index / 3) },
        type: "default",
        style: nodeStyle,
    }));

    // Initial edges with custom style
    const initialEdges: Edge[] = [];
    projects.forEach((project, index) => {
        if (index < projects.length - 1) {
            initialEdges.push({
                id: `${project.uuid}-${projects[index + 1].uuid}`,
                source: project.uuid,
                target: projects[index + 1].uuid,
                animated: true,
                style: edgeStyle,
                label: "Connected",
                labelStyle: { fill: currentColors.edgeLabel, fontWeight: "bold" },
                labelBgStyle: {
                    fill: currentColors.edgeLabelBg,
                    padding: "2px",
                    borderRadius: "4px",
                },
            });
        }
    });

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div
            style={{
                width: "100%",
                height: "600px",
                background: currentColors.background,
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionMode={ConnectionMode.Loose}
                fitView
            >
                {/* Custom Background with Animated Gradient and Pulsating Dots */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(145deg, ${
                            theme === "dark" ? "#1e1e1e, #2c2c2c" : "#f5f5f5, #e0e0e0"
                        })`,
                        animation: "gradientAnimation 10s ease infinite",
                    }}
                >
                    <div
                        className="absolute inset-0 dark:bg-gray-800"
                        style={{
                            backgroundImage: `radial-gradient(${
                                theme === "dark" ? "#444" : "#ddd"
                            } 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                            animation: "pulseAnimation 5s ease-in-out infinite",
                        }}
                    />
                </div>

                {/* Custom controls */}
                <Controls
                    style={{
                        background: currentColors.controlsBg,
                        border: `1px solid ${currentColors.controlsBorder}`,
                        borderRadius: "5px",
                        boxShadow: `0 0 10px ${currentColors.controlsBorder}`,
                    }}
                />
            </ReactFlow>

            {/* Global styles for animations */}
            <style>
                {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes pulseAnimation {
            0% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.5;
            }
          }

          @keyframes dashdraw {
            from {
              stroke-dashoffset: 10;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          .react-flow__node {
            box-shadow: 0 0 10px ${currentColors.nodeBorder}, 0 0 20px ${currentColors.nodeBorder};
            transition: box-shadow 0.3s ease;
          }

          .react-flow__node:hover {
            box-shadow: 0 0 15px ${currentColors.nodeBorder}, 0 0 30px ${currentColors.nodeBorder};
          }

          .react-flow__edge-path {
            stroke: ${currentColors.edgeStroke};
            stroke-width: 2;
            stroke-dasharray: 5 5;
            animation: dashdraw 0.5s linear infinite;
          }

          .react-flow__controls {
            background: ${currentColors.controlsBg};
            border: 1px solid ${currentColors.controlsBorder};
            border-radius: 5px;
            box-shadow: 0 0 10px ${currentColors.controlsBorder};
          }

          .react-flow__controls-button {
            background: ${currentColors.controlsButtonBg};
            border: 1px solid ${currentColors.controlsBorder};
            color: ${currentColors.controlsButtonText};
            border-radius: 3px;
            transition: background 0.3s ease, color 0.3s ease;
          }

          .react-flow__controls-button:hover {
            background: ${currentColors.controlsBorder};
            color: ${currentColors.controlsBg};
          }
        `}
            </style>
        </div>
    );
};

export default ERDDiagram;