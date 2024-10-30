import { ButtonHTMLAttributes, ReactElement } from "react";

const buttonVariants = {
  default: "bg-blu/15 text-blu hover:bg-blu hover:text-pure",
  action: "bg-blu text-pure hover:bg-blu hover:text-pure",
  close: "py-0 px-0 bg-black/15 text-black hover:bg-black hover:text-pure",
  login:
    "bg-black text-pure hover:bg-blu hover:text-cream hover:-translate-y-1 hover:shadow hover:shadow-blu",
  register:
    "bg-black text-pure hover:text-cream hover:bg-blu hover:-translate-y-1",
  delete: "bg-red/15 text-red hover:bg-red hover:text-pure hover:animate-shake",
  cancel: "bg-red/15 text-red hover:bg-red hover:text-pure",
  ghost: "hover:text-blu",
  disabled: "opacity-50 cursor-not-allowed",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement;
  className?: string;
  variant: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  variant,
  onClick,
  disabled,
  ...props
}: Props) => {
  const styling =
    "py-2 px-4 transition-all dash-expo duration-300 rounded-full " +
    variant +
    " " +
    className;

  return (
    <button
      className={styling}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };
