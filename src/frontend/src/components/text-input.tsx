import { memo, useRef } from "react";
import { useDispatcherWithAttr } from "routelit-client";

const TextInput = memo(function TextInput({
  id,
  label,
  value,
  helpText,
  errorText,
  ...props
}: {
  id: string;
  label?: string;
  value?: string;
  helpText?: string;
  errorText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const dispatchChange = useDispatcherWithAttr(id, "change", "value");
  const lastValueRef = useRef(value);

  function handleChange(newValue: string) {
    if (newValue !== lastValueRef.current) {
      dispatchChange(newValue);
      lastValueRef.current = newValue;
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleChange((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="form-group__input">
        <input
          type="text"
          id={id}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          defaultValue={value}
          {...props}
        />
      </div>
      {helpText && (
        <div className="form-group__help-text">
          <small>{helpText}</small>
        </div>
      )}
      {errorText && (
        <div className="form-group__error-text">
          <small>{errorText}</small>
        </div>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
