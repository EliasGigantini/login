import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "../../table";

interface Props {
  items: ReadonlyArray<{}>;
  handleOpenModal: (item: any) => void;
}

export const TableComponent = ({ items, handleOpenModal }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow className="h-10 pointer-events-none">
          {items[0] ? (
            Object.keys(items[0]).map((field) => (
              <TableHeader key={field}>{field}</TableHeader>
            ))
          ) : (
            <></>
          )}
          <TableHeader>Edit</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items?.map((item: any) => (
          <TableRow key={item.id} id={item.id} className="h-8">
            {Object.keys(item).map((field) => (
              <TableCell key={`${item.id}_${field}`} variant={field}>
                {item[field]}
              </TableCell>
            ))}
            <TableCell
              variant={"edit"}
              handleClick={() => handleOpenModal(item)}
            ></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
