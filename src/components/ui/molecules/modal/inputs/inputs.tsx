import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";

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

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Props {
  name: string;
}

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Props {
  name: string;
}

interface InputsVariantProps {
  variant?: string;
  value: string;
  handleChange: (e: any) => void;
  errorMessage?: string | "";
}

export const Input = ({
  type,
  controlString,
  inputStyle,
  variant,
  labelText,
  labelStyle,
  required,
  name,
  ...props
}: InputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;
  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      {labelText}
      <input
        type={type}
        value={value ?? ""}
        className={styling}
        onChange={onChange}
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

export const TextArea = ({
  controlString,
  inputStyle,
  variant,
  labelText,
  labelStyle,
  name,
  ...props
}: TextAreaProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;

  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      {labelText}
      <textarea
        value={value ?? ""}
        className={`resize-y rounded-lg caret-blu max-h-96 min-h-10 ${styling} bg-white rounded-full px-4`}
        onChange={onChange}
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

export const InputVariants = ({
  variant,
  value,
  handleChange,
  errorMessage,
}: InputsVariantProps) => {
  switch (variant) {
    case "textarea":
      return (
        <TextArea
          type="text"
          labelText="Title"
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name="title"
        />
      );

    default:
      return (
        <Input
          type="text"
          labelText="Title"
          variant={inputStyleVariants.default}
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name="title"
        />
      );
  }
};
