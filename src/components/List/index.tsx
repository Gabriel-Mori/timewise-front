import { Spinner } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface Props {
  data: any[];
  minWidth?: number;
  loading?: boolean;
  sortField?: string;
  sortDir?: string;
  onSortChange?: (sort: any, order: any) => void;
  children: any;
}

const HeaderColumn = ({ col, onSortChange, sortDir, sortField }: any) => {
  const [dir, setDir] = useState(sortDir || "asc");

  return (
    <div
      style={{
        maxWidth: col.props.width,
        textAlign: col.props.align,
      }}
      className={`flex-1 text-sm text-gray-800  dark:text-white font-semibold mr-6 ${
        col.props.sortable ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        onSortChange(col.props.name, sortDir == "asc" ? "desc" : "asc");
        setDir(sortDir == "asc" ? "desc" : "asc");
      }}
    >
      {col.props.label || col.props.name}
      {col.props.sortable && (
        <>
          {dir == "asc" && (
            <RiArrowDownSLine
              className={`inline ${
                sortField == col.props.name ? "opacity-100" : "opacity-25"
              }`}
            />
          )}
          {dir == "desc" && (
            <RiArrowUpSLine
              className={`inline ${
                sortField == col.props.name ? "opacity-100" : "opacity-25"
              }`}
            />
          )}
        </>
      )}
    </div>
  );
};

const List: React.FC<Props> = ({
  data,
  children,
  minWidth,
  loading = false,
  sortDir,
  sortField,
  onSortChange,
}) => {
  const columns: any[] = React.Children.toArray(children);

  const column = (child: any, row: any) => {
    const props = { row };
    return React.cloneElement(child, props);
  };

  const header = () => {
    return (
      <div className="flex flex-row px-6 py-2 border-b ">
        {columns.map((col, i) => (
          <HeaderColumn
            col={col}
            key={i}
            onSortChange={onSortChange}
            sortDir={sortDir}
            sortField={sortField}
          />
        ))}
      </div>
    );
  };

  const body = () => {
    return (
      <div>
        {data.map((row, i) => (
          <div
            key={i}
            className="flex flex-row text-black dark:text-white px-6 py-3"
          >
            {columns.map((col, i) => (
              <div
                style={{
                  maxWidth: col.props.width,
                  textAlign: col.props.align,
                }}
                className="flex-1 truncate mr-6"
                key={i}
              >
                {column(col, row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-auto">
      <div
        className="w-full  max-h-[550px] "
        style={{ minWidth: minWidth ? minWidth : "auto", minHeight: 124 }}
      >
        {!loading && data.length > 0 && (
          <div>
            {header()} {body()}
          </div>
        )}
        {data.length === 0 && !loading && (
          <div className="flex h-64 flex-col items-center justify-center ">
            <FiSearch size={100} className="text-gray-300 " />
            <span className=" text-xl font-semibold text-gray-400 mt-4">
              Nenhum dado encontrado
            </span>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center h-full w-full">
            <Spinner className="animate-spin text-pink text-8xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
