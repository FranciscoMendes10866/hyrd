import type { CSSProperties } from "react";
import { type NodeProps, Handle, Position } from "reactflow";

import { css } from "../../styled-system/css";
import { token } from "../../styled-system/tokens";

export default function DefaultNode(props: NodeProps) {
  return (
    <div className={styles.wrapper}>
      <Handle
        id={Position.Top}
        position={Position.Top}
        type="target"
        style={styles.handleTop}
      />
      <Handle
        id={Position.Bottom}
        position={Position.Bottom}
        type="source"
        style={styles.handleBottom}
      />
    </div>
  );
}

const styles = {
  wrapper: css({
    backgroundColor: "neutral.900",
    height: 70,
    width: 200,
    borderRadius: "md",
    border: "solid",
    borderWidth: 2,
    borderColor: "orange.400",
  }),
  handleTop: {
    height: token("spacing.2"),
    width: token("spacing.2"),
    top: -15,
    backgroundColor: token("colors.orange.400"),
    borderColor: "transparent",
  } satisfies CSSProperties,
  handleBottom: {
    height: token("spacing.2"),
    width: token("spacing.2"),
    bottom: -15,
    backgroundColor: token("colors.orange.400"),
    borderColor: "transparent",
  } satisfies CSSProperties,
};
