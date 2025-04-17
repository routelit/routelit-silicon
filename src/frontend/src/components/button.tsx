import { memo, useCallback } from "react";

const Button = memo(function Button({
  text,
  id,
  ...props
}: {
  text: string;
  id: string;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const handleClick = useCallback(() => {
    const event = new CustomEvent("routelit:event", {
      detail: { id, type: "click" },
    });
    document.dispatchEvent(event);
  }, [id]);
  return (
    <button id={id} {...props} onClick={handleClick}>
      {text}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
