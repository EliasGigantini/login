import React, {
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
  useEffect,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import { Eye } from "lucide-react";

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
  children?: ReactElement;
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
  id?: string;
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
  children,
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
      {labelText === "EMPTY" ? (
        <></>
      ) : (
        <div className="flex flex-row w-full justify-between items-center">
          <p>{inputTitle}</p>
          {id !== "" && <p className="text-xs">id: {id}</p>}
        </div>
      )}
      {children ? (
        <input
          type={type}
          value={value ?? ""}
          className={styling}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          className={styling}
          onChange={onChange}
          {...props}
        />
      )}
      {controlString && (
        <p
          className={`h-6 text-red text-xs transition-all duration-300 ease-dash-expo ${errorText ? "block translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"}`}
        >
          {controlString}
        </p>
      )}
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
        {id !== "" && <p className="text-xs">id: {id}</p>}
      </div>
      <textarea
        name={name}
        value={value ?? ""}
        className={`resize-y rounded-lg caret-blu max-h-96 min-h-10 ${styling} bg-white rounded-full px-4`}
        onChange={onChange}
        {...props}
      />
      <p
        className={`mt-2 h-6 text-red text-sm ${errorText ? "block" : "invisible"}`}
      >
        {controlString}
      </p>
    </label>
  );
};

export const Comment = ({
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
      <textarea
        name={name}
        value={value ?? ""}
        className={`resize-y rounded-lg caret-blu max-h-96 min-h-10 ${styling} bg-white rounded-full px-4`}
        onChange={onChange}
        {...props}
      />
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
          id={id ? id : ""}
        />
      );

    case "password":
      return (
        <Input
          type="password"
          placeholder="Password"
          labelText="EMPTY"
          variant={inputStyleVariants.default}
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id ? id : ""}
        >
          <button className="w-full h-full">
            <Eye className="w-4 h-4" />
          </button>
        </Input>
      );

    case "email":
      return (
        <Input
          type="text"
          placeholder="Email"
          labelText="EMPTY"
          variant={inputStyleVariants.default}
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id ? id : ""}
        />
      );

    case "comment":
      return (
        <Input
          type="text"
          placeholder="Comment"
          labelText="EMPTY"
          variant={inputStyleVariants.default}
          value={value ?? ""}
          // controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id ? id : ""}
        />
      );

    case "commentArea":
      return (
        <Comment
          type="text"
          labelText={name}
          placeholder="Comment"
          value={value ?? ""}
          controlString={errorMessage || ""}
          onChange={handleChange}
          name={name}
          id={id ? id : ""}
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
          id={id ? id : ""}
        />
      );
  }
};
