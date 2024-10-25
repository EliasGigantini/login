import { ReactElement } from "react";
import { X } from "lucide-react";
import { Button, buttonVariants } from "../../../button";

interface Props {
  children?: ReactElement | ReactElement[];
  variant?: string;
  action?: () => void;
  className?: string;
}

interface RowProps {
  title?: string;
  data: string | number;
  icon?: ReactElement;
}

const sectionStyleVariants = {
  row: "flex flex-row justify-evenly gap-2",
  column: "flex flex-col gap-2",
  exit: "absolute right-2 top-2",
  none: "mt-8",
};

const ModalSectionExit = ({ action, className }: Partial<Props>) => {
  return (
    <section className={`${sectionStyleVariants.exit} ${className}`}>
      <Button
        type="button"
        className="flex items-center justify-center w-10 h-10"
        variant={buttonVariants.close}
        onClick={action}
      >
        <X className="w-4 h-4" />
      </Button>
    </section>
  );
};

const ModalSectionRow = ({ children, className }: Partial<Props>) => {
  return (
    <section className={`${sectionStyleVariants.row} ${className}`}>
      {children}
    </section>
  );
};

const ModalSectionColumn = ({ children, className }: Partial<Props>) => {
  return (
    <section className={`${sectionStyleVariants.column} ${className}`}>
      {children}
    </section>
  );
};

const ModalRow = ({ title, data, icon }: RowProps) => {
  if (icon) {
    return (
      <div className="flex justify-center items-center gap-1 flex-1">
        <>{icon}</>
        <p>{data}</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center gap-1 flex-1">
      <p>{title}:</p>
      <p>{data}</p>
    </div>
  );
};

const ModalSection = ({
  children,
  variant = "column",
  action,
  className,
}: Props) => {
  switch (variant) {
    case "column":
      return (
        <ModalSectionColumn className={className}>
          {children}
        </ModalSectionColumn>
      );

    case "row":
      return (
        <ModalSectionRow className={className}>{children}</ModalSectionRow>
      );

    case "exit":
      return <ModalSectionExit className={className} action={action} />;

    default:
      break;
  }
};

export { ModalSection, ModalRow, sectionStyleVariants };
