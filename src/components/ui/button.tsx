import { ButtonHTMLAttributes, ReactElement } from "react";

const buttonVariants = {
  default:
    "rounded-full px-4 py-2 bg-white text-black transition-color ease-in-out duration-300 hover:bg-blu hover:text-cream",
  cancel:
    "rounded-full px-4 py-2 bg-black text-white transition-color ease-in-out duration-300 hover:bg-red hover:text-cream",
  delete:
    "rounded-full px-4 py-2 bg-red text-white hover:animate-pulse-fast duration-75",
  close:
    "rounded-full bg-white text-black transition-color ease-in-out duration-300 hover:bg-black hover:text-white",
  ghost:
    "rounded-full px-4 py-2 transition-color ease-in-out duration-300 hover:text-blu",
  action:
    "rounded-full px-4 py-2 bg-black text-white transition-color ease-in-out duration-300 hover:text-black hover:bg-cream",
  disabled: "rounded-full px-4 py-2 bg-white opacity-50 cursor-not-allowed",
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
  const styling = className + " " + variant;

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
