import { useCallback } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/core/dist/types";
import { createNanoEvents } from "nanoevents";

import Flow, { DROPPABLE_ID } from "./modules/Flow";
import FloatingBar from "./modules/FloatingBar";
import { CUBE_ITEM_ID } from "./modules/FloatingBar/CubeItem";

export type DropItem = {
  type: string;
  coordinates: Coordinates;
};

export const emitter = createNanoEvents();

const MAP: Record<string, string> = {
  [CUBE_ITEM_ID]: "defaultNode",
};

export default function App() {
  const onDragEndHandler = useCallback(({ over, active }: DragEndEvent) => {
    const overId = over?.id;
    if (!overId || overId !== DROPPABLE_ID) return;

    const { translated } = active.rect.current;

    emitter.emit("item-drop", {
      type: MAP[active.id],
      coordinates: {
        x: translated?.left || 0,
        y: translated?.top || 0,
      },
    });
  }, []);

  return (
    <DndContext onDragEnd={onDragEndHandler}>
      <Flow />
      <FloatingBar />
    </DndContext>
  );
}
