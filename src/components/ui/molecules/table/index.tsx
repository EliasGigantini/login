import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "./components";

interface Props {
  data: ReadonlyArray<{}>;
  handleOpenModal: (item: any) => void;
}

export const TableComponent = ({ data, handleOpenModal }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow className="h-10 pointer-events-none">
          {data[0] ? (
            Object.keys(data[0]).map((field) => (
              <TableHeader key={field}>{field}</TableHeader>
            ))
          ) : (
            <></>
          )}
          <TableHeader>Edit</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item: any) => (
          <TableRow key={item.id} id={item.id} className="h-8">
            {Object.keys(item).map((field) => (
              <TableCell key={`${item.id}_${field}`} variant={field}>
                {Array.isArray(item[field]) ? item[field].length : item[field]}
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
