"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

interface HierarchyItem {
  id: string;
  designation: string;
  nextDesignations: string[];
  description: string;
  title: string;
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "CEO\nJohn Doe" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: { label: "Director\nJane Smith" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Manager\nBob Johnson" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    type: "output",
    data: { label: "Employee\nAlice Brown" },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const initialHierarchyData: HierarchyItem[] = [
  {
    id: "1",
    designation: "CEO",
    nextDesignations: ["Director", "Manager"],
    description: "Chief Executive Officer",
    title: "John Doe",
  },
  {
    id: "2",
    designation: "Director",
    nextDesignations: ["Employee"],
    description: "Director of Operations",
    title: "Jane Smith",
  },
  {
    id: "3",
    designation: "Manager",
    nextDesignations: ["Employee"],
    description: "Project Manager",
    title: "Bob Johnson",
  },
  {
    id: "4",
    designation: "Employee",
    nextDesignations: [],
    description: "Software Developer",
    title: "Alice Brown",
  },
];

const CompanyHierarchyComponent: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hierarchyData, setHierarchyData] =
    useState<HierarchyItem[]>(initialHierarchyData);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));

      // Update the hierarchyData when a new connection is made
      setHierarchyData((prevData) =>
        prevData.map((item) => {
          if (item.id === params.source) {
            const targetNode = prevData.find((d) => d.id === params.target);
            if (
              targetNode &&
              !item.nextDesignations.includes(targetNode.designation)
            ) {
              return {
                ...item,
                nextDesignations: [
                  ...item.nextDesignations,
                  targetNode.designation,
                ],
              };
            }
          }
          return item;
        }),
      );
    },
    [setEdges],
  );

  const updateTableData = (
    id: string,
    field: keyof HierarchyItem,
    value: string | string[],
  ) => {
    setHierarchyData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

    if (field === "designation" || field === "title") {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: `${
                    field === "designation"
                      ? value
                      : node.data.label.split("\n")[0]
                  }\n${
                    field === "title" ? value : node.data.label.split("\n")[1]
                  }`,
                },
              }
            : node,
        ),
      );
    }

    // Update edges when nextDesignations change
    if (field === "nextDesignations") {
      const sourceNode = nodes.find((node) => node.id === id);
      if (sourceNode) {
        const newEdges = (value as string[])
          .map((designation) => {
            const targetNode = nodes.find((node) =>
              node.data.label.startsWith(designation),
            );
            if (targetNode) {
              return {
                id: `e${sourceNode.id}-${targetNode.id}`,
                source: sourceNode.id,
                target: targetNode.id,
                markerEnd: { type: MarkerType.ArrowClosed },
              };
            }
            return null;
          })
          .filter((edge) => edge !== null);

        setEdges((prevEdges) => [
          ...prevEdges.filter((edge) => edge.source !== sourceNode.id),
          ...newEdges,
        ]);
      }
    }
  };

  const addNewNode = useCallback(() => {
    const newId = (nodes.length + 1).toString();
    const newNode: Node = {
      id: newId,
      data: { label: "New Node\nNew Title" },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setHierarchyData((prevData) => [
      ...prevData,
      {
        id: newId,
        designation: "New Node",
        nextDesignations: [],
        description: "",
        title: "New Title",
      },
    ]);
  }, [nodes.length, setNodes]);

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setHierarchyData((prevData) =>
        prevData.filter((item) => !deleted.some((node) => node.id === item.id)),
      );
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !deleted.some(
              (node) => node.id === edge.source || node.id === edge.target,
            ),
        ),
      );
    },
    [setEdges],
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button
          onClick={addNewNode}
          className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Node
        </button>
      </div>
      <div className="h-1/2 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Next Designations</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Title</th>
            </tr>
          </thead>
          <tbody>
            {hierarchyData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.designation}
                    onChange={(e) =>
                      updateTableData(item.id, "designation", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.nextDesignations.join(", ")}
                    onChange={(e) =>
                      updateTableData(
                        item.id,
                        "nextDesignations",
                        e.target.value.split(", ").map((s) => s.trim()),
                      )
                    }
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateTableData(item.id, "description", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateTableData(item.id, "title", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyHierarchyComponent;
