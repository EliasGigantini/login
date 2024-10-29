import { TableHTMLAttributes } from "react";
import { Eye, Pencil } from "lucide-react";

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  className?: string;
}

interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

interface TableHeaderProps extends TableHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

interface TableCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  variant?: string;
  handleClick?: () => void;
}

export const Table = ({ className, ...props }: Props) => {
  return <table className={`w-full text-sm my-6 ${className}`} {...props} />;
};

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return <thead className={className} {...props} />;
};

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return <tr className={`${className}`} {...props} />;
};

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return (
    <th className={`capitalize border border-cream ${className}`} {...props} />
  );
};

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <tbody className={className} {...props} />;
};

export const TableCell = ({
  children,
  className,
  variant = "default",
  handleClick,
  ...props
}: TableCellProps) => {
  switch (variant) {
    case "views":
      return (
        <td
          className={`flex flex-row gap-1 items-center text-sm capitalize ${className}`}
          {...props}
        >
          <Eye className="w-4 h-4 opacity-50" />
          {children}
        </td>
      );

    case "id":
      return (
        <td className={`text-red ${className}`} {...props}>
          {children}
        </td>
      );

    case "edit":
      return (
        <td className={`text-sm capitalize ${className}`} {...props}>
          <button onClick={handleClick}>
            <Pencil className="w-4 h-4" />
          </button>
        </td>
      );

    default:
      return (
        <td className={`text-sm capitalize bg-red ${className}`} {...props}>
          {children}
        </td>
      );
  }
};
