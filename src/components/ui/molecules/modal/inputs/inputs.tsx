import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";

export const inputStyleVariants = {
  default: "h-10 bg-white rounded-full px-4",
};

interface Props {
  type?: React.HTMLInputTypeAttribute;
  labelText: string;
  labelStyle?: string;
  variant?: string;
  inputStyle?: string;
  controlString?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Props {
  name: string;
  id: string;
}

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Props {
  name: string;
  id: string;
}

interface InputsVariantProps {
  variant?: string;
  value: string;
  handleChange: (e: any) => void;
  errorMessage?: string | "";
  name: string;
  id: string;
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
  id,
  ...props
}: InputProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;
  const inputTitle = labelText[0].toUpperCase() + labelText.slice(1);

  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      <div className="flex flex-row w-full justify-between items-center">
        <p>{inputTitle}</p>
        <p className="text-xs">id: {id}</p>
      </div>
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
  id,
  ...props
}: TextAreaProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const errorText = controlString ? "text-red" : "";
  const styling = inputStyle + " " + variant + " " + errorText;
  const inputTitle = labelText[0].toUpperCase() + labelText.slice(1);

  return (
    <label className={`flex flex-col gap-1 ${labelStyle} ${errorText}`}>
      <div className="flex flex-row w-full justify-between items-center">
        <p>{inputTitle}</p>
        <p className="text-xs">id: {id}</p>
      </div>
      <textarea
        name={name}
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
  name,
  id,
}: InputsVariantProps) => {
  useEffect(() => {
    console.log("Error Messsage Input: " + errorMessage);
  }, [errorMessage]);

  switch (variant) {
    case "textarea":
      return (
        <TextArea
          type="text"
          labelText={name}
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id}
        />
      );

    default:
      return (
        <Input
          type="text"
          labelText={name}
          variant={inputStyleVariants.default}
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id}
        />
      );
  }
};
