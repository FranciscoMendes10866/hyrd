import { type CSSProperties, Fragment } from "react";
import { type EdgeProps, BaseEdge, getSmoothStepPath } from "reactflow";

import { token } from "../../styled-system/tokens";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <Fragment>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={styles.edge}
      />
    </Fragment>
  );
}

const styles = {
  edge: {
    strokeWidth: token("sizes.0.5"),
    stroke: token("colors.neutral.300"),
  } satisfies CSSProperties,
};
