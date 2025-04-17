import { memo, useCallback } from "react";

const Checkbox = memo(
  function Checkbox({
    label,
    checked,
    ...props
  }: { label: string; checked: boolean } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange"
  >) {
    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const event = new CustomEvent("routelit:event", {
          detail: {
            type: "change",
            id: props.id,
            checked: e.target.checked,
          },
        });
        document.dispatchEvent(event);
      },
      [props.id]
    );
    return (
      <div className="form-control">
        <input
          type="checkbox"
          {...props}
          checked={checked}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
