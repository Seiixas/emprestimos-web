import React from "react";

type Row = {
  [key: string]: string;
};

export type Header<T> = {
  label: string;
  key: keyof T;
};

interface TableProps<T extends Row>
  extends React.HTMLAttributes<HTMLTableElement> {
  headers: Header<T>[];
  data: T[];
}

const Table = <T extends Row>({ headers, data, ...rest }: TableProps<T>) => {
  return (
    <table className="w-full" {...rest}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={String(header.key)} className="p-2 text-left" scope="col">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={String(header.key)} className="p-2 border-b border-t">
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
