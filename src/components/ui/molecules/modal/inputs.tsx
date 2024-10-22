import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

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
        className={`resize-y rounded-lg caret-blu max-h-96 min-h-8 ${styling}`}
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
  //   return (
  //     <label className="inline-flex items-center cursor-pointer">
  //       <input type="checkbox" value="" className="sr-only peer" />
  //       <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blu rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-cream after:border-cream after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blu"></div>
  //       <span className="ms-2 text-sm">Casual Title Generation</span>
  //     </label>
  //   );

  //   return (
  //     <div className="">
  //       <TextArea
  //         inputStyle="peer peer-checked:visible"
  //         labelText="Title"
  //         defaultValue="Title"
  //       />
  //       <Input
  //         inputStyle="peer peer-checked:invisible"
  //         labelText="Title"
  //         value="Title"
  //       />
  //       <label className="inline-flex items-center cursor-pointer">
  //         <input type="checkbox" value="" className="sr-only peer" />
  //         <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blu rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-cream after:border-cream after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blu"></div>
  //         <span className="ms-2 text-sm">Use Text Area</span>
  //       </label>
  //     </div>
  //   );

  return (
    <div className="">
      <Input
        inputStyle="peer peer-checked:invisible"
        labelText="Title"
        value="Title"
      />
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blu rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-cream after:border-cream after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blu"></div>
        <span className="ms-2 text-sm">Use Text Area</span>
      </label>
    </div>
  );
};
