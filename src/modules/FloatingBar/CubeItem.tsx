import { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@radix-ui/react-toolbar";
import { Cuboid } from "lucide-react";

import { css } from "../../../styled-system/css";

export const CUBE_ITEM_ID = "draggable-cube-item";

export default function CubeItem() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: CUBE_ITEM_ID,
  });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
    }),
    [transform],
  );

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Cuboid className={styles.item} />
    </Button>
  );
}

const styles = {
  item: css({
    color: "orange.400",
    height: 8,
    width: 8,
    _hover: {
      cursor: "grab",
    },
  }),
};
