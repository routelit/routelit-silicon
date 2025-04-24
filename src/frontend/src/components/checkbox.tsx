import { memo, useCallback } from "react";
import { useDispatcherWithAttr } from "routelit-client";

const Checkbox = memo(function Checkbox({
  label,
  checked,
  ...props
}: { label: string; checked: boolean } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
>) {
  const dispatchChange = useDispatcherWithAttr(props.id!, "change", "checked");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatchChange(e.target.checked);
    },
    [dispatchChange]
  );
  return (
    <div className="form-control">
      <input type="checkbox" {...props} checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
