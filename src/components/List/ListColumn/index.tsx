import React from "react";

interface Props {
  name: string;
  label?: string;
  row?: any;
  width?: string;
  align?: "right" | "left" | "center";
  render?(row: any): JSX.Element;
  sortable?: boolean;
}

const ListColumn: React.FC<Props> = ({ name, row, render, sortable }) => {
  if (render) {
    return <span>{render(row)}</span>;
  }
  return <span>{`${row[name]}`}</span>;
};

export default ListColumn;
