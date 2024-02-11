import { Root } from "@radix-ui/react-toolbar";

import CubeItem from "./CubeItem";

import { css } from "../../../styled-system/css";

export default function FloatingBar() {
  return (
    <Root className={styles.toolbar}>
      <CubeItem />
    </Root>
  );
}

const styles = {
  toolbar: css({
    position: "fixed",
    bottom: 10,
    left: "43%",
    backgroundColor: "neutral.800",
    border: "solid",
    borderColor: "neutral.700",
    borderWidth: 2,
    padding: 1.5,
    borderRadius: "lg",
    height: 16,
    minWidth: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  }),
};
