import { InputHTMLAttributes } from "react";

const inputStyleVariants = {
  default: "h-10 bg-white rounded-full px-4",
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute;
  labelText?: string;
  labelStyle?: string;
  variant?: string;
  inputStyle?: string;
  value?: string;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  controlString: string;
}

const Input = ({
  type,
  labelText,
  labelStyle,
  variant,
  inputStyle,
  value,
  required,
  onChange,
  controlString,
  ...rest
}: InputProps) => {
  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;
  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      {labelText}
      <input
        type={type}
        className={styling}
        value={value}
        onChange={onChange}
        required={required}
        {...rest}
      />
      <p
        className={`mt-2 text-red text-sm ${errorText ? "block" : "invisible"}`}
      >
        Err: {controlString}
      </p>
    </label>
  );
};

export { Input, inputStyleVariants };
