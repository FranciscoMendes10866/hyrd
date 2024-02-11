import "reactflow/dist/style.css";
import { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  type ProOptions,
  type NodeTypes,
  type Node,
  type OnConnect,
  type EdgeTypes,
  type DefaultEdgeOptions,
  type ReactFlowInstance,
  type XYPosition,
  Background,
  Controls,
  ConnectionMode,
  useEdgesState,
  addEdge,
  useNodesState,
} from "reactflow";
import { useDroppable } from "@dnd-kit/core";

import { css } from "../../styled-system/css";
import { token } from "../../styled-system/tokens";

import DefaultNode from "../components/DefaultNode";
import DefaultEdge from "../components/DefaultEdge";
import { type DropItem, emitter } from "../App";

const OPTIONS = { hideAttribution: true } satisfies ProOptions;
const DEFAULT_EDGE_OPTIONS = { type: "default" } satisfies DefaultEdgeOptions;
export const DROPPABLE_ID = "droppable-area";

const NODE_TYPES = {
  defaultNode: DefaultNode,
} satisfies NodeTypes;

const EDGE_TYPES = {
  default: DefaultEdge,
} satisfies EdgeTypes;

export default function Flow() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const flowInstance = useRef<ReactFlowInstance | undefined>(undefined);

  const { setNodeRef } = useDroppable({
    id: DROPPABLE_ID,
  });

  const onConnectHandler: OnConnect = useCallback((connection) => {
    setEdges((state) => addEdge(connection, state));
  }, []);

  useEffect(() => {
    return emitter.on("item-drop", (item: DropItem) => {
      const position = flowInstance.current?.screenToFlowPosition(
        item.coordinates,
      ) as XYPosition;

      const newNode = {
        id: crypto.randomUUID(),
        type: item.type,
        position,
        data: {},
      } satisfies Node;

      setNodes((datums) => [...datums, newNode]);
    });
  }, []);

  return (
    <div className={styles.wrapper} ref={setNodeRef}>
      <ReactFlow
        proOptions={OPTIONS}
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Strict}
        edgeTypes={EDGE_TYPES}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnectHandler}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        onInit={(value) => (flowInstance.current = value)}
      >
        <Background gap={22} size={2} color={token("colors.neutral.700")} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const styles = {
  wrapper: css({
    width: "100vw",
    height: "100vh",
    backgroundColor: "neutral.900",
  }),
};
