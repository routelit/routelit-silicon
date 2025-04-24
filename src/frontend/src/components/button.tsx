import { memo, useCallback } from "react";
import { useDispatcherWith } from "routelit-client";

const Button = memo(function Button({
  text,
  id,
  ...props
}: {
  text: string;
  id: string;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const dispatch = useDispatcherWith(id, "click");
  const handleClick = useCallback(() => {
    dispatch({});
  }, [dispatch]);
  return (
    <button id={id} {...props} onClick={handleClick}>
      {text}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
