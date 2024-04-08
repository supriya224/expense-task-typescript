import { ReactNode } from "react";

interface SpacerProps {
  size: number;
  axis?: string;
  classes?: string;
  delegated?: ReactNode;
}
function Spacer({ size, axis, classes, delegated }: SpacerProps) {
  const width = axis === "vertical" ? 1 : size;
  const height = axis === "horizontal" ? 1 : size;
  return (
    <div
      style={{
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
      className={`${classes}`}
    >
      {delegated}
    </div>
  );
}
export default Spacer;
