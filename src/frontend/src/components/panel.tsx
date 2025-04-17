import { memo } from "react";

const Panel = memo(function Panel({ children }: { children: React.ReactNode }) {
  return <div className="panel">{children}</div>;
});

Panel.displayName = "Panel";

export default Panel;
