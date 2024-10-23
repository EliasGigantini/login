import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";

export const inputStyleVariants = {
  default: "h-10 bg-white rounded-full px-4",
};

interface Props {
  type?: React.HTMLInputTypeAttribute;
  labelText?: string;
  labelStyle?: string;
  variant?: string;
  inputStyle?: string;
  controlString?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Props {}

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Props {}

export const Input = ({
  type,
  controlString,
  inputStyle,
  variant,
  labelText,
  labelStyle,
  required,
  ...props
}: InputProps) => {
  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;
  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      {labelText}
      <input type={type} className={styling} {...props} />
      <p
        className={`mt-2 text-red text-sm ${errorText ? "block" : "invisible"}`}
      >
        Err: {controlString}
      </p>
    </label>
  );
};

export const TextArea = ({
  controlString,
  inputStyle,
  variant,
  labelText,
  labelStyle,
  ...props
}: TextAreaProps) => {
  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;

  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      {labelText}
      <textarea
        className={`resize-y rounded-lg caret-blu max-h-96 min-h-10 ${styling} bg-white rounded-full px-4`}
        {...props}
      />
      <p
        className={`mt-2 text-red text-sm ${errorText ? "block" : "invisible"}`}
      >
        Err: {controlString}
      </p>
    </label>
  );
};

export const Switch = ({ labelText, ...props }: InputProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };
  return (
    <label className="flex flex-row items-center">
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={false}
        onChange={handleCheckbox}
      />
      <span className="">Checkbox</span>
    </label>
  );
};
