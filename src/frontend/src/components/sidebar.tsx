import { useState, type PropsWithChildren } from "react";

interface SidebarProps {
  defaultOpen?: boolean;
}

interface ToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

function ToggleButton({ isOpen, toggle }: ToggleButtonProps) {
  return (
    <button className="sidebar-toggle" onClick={toggle}>
      {isOpen ? "x" : ">"}
    </button>
  );
}

function Sidebar({ defaultOpen, children }: PropsWithChildren<SidebarProps>) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <>
      <ToggleButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <aside className={`ho-resize ${isOpen ? "" : "hidden"}`}>
        {children}
      </aside>
    </>
  );
}

export default Sidebar;
