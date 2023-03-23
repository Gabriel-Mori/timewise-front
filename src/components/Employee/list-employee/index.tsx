import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";
import Pagination from "react-js-pagination";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { IoCheckmarkDoneSharp, IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../input";
import { EmployeeService } from "../../../services/employee-service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BiTimer } from "react-icons/bi";
import moment from "moment";
import { Tooltip } from "@mui/material";
import Button from "../../Button";
import Row from "../Row";


interface Props {
  name?: string;
  id?: number;
  email?: string;
  phone?: string;
  active?: boolean;
  projects?: any;
}

interface CollaboratorProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  searchTerm?: string;
}

const CollaboratorList: React.FC = () => {
  const router = useRouter();
  const [rows, setRows] = useState<Props[]>([])

  const [selectedItem, setSelectedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<CollaboratorProps>({
    pageNumber: 1,
    pageSize: 6,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const searchCollaborator = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 6
  ) => {
    EmployeeService.getEmployee(searchTerm, pageSize, pageNumber).then(
      (response) => {
        setPagination({
          ...pagination,
          searchTerm,
          pageSize,
          pageNumber,
          ...response.data,
        });
      }
    );
  };

  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    searchCollaborator(value);
  };

  const deleteFromList = async () => {
    if (inputValue === "Confirmar") {
      await http.delete(`/employee/${selectedItem.id}`);
      toast.success("Item deletado", {
        position: "top-right",
        icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
        autoClose: 2000,
        theme: "colored",
      });
      searchCollaborator();
      setSelectedItem({});

    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
  };

  useEffect(() => {
    searchCollaborator();
  }, []);

  const edit = (id: any) => {
    router.push(`/collaborator/edit/${id}`);
  };

  function createData(row: any) {
    return {
      name: row.name,
      email: row.email,
      phone: row.phone,
      projects: row.projects,
      active: row.active,
      id: row.id
    }
  }

  useEffect(() => {
    const newRows: any = pagination.content.map((rows) => createData(rows))
    setRows(newRows)
  }, [pagination]);

  return (
    <div>
      <div className="mt-8">
        <div className="flex justify-between items-end mb-6">
          <div className="w-full mr-5">
            <Input
              className="border border-gray-300 "
              placeholder="Pesquise por nome do projeto"
              icon={<IoSearchOutline className="font-gray-medium" />}
              onChange={(e: any) => handleInputSearch(e)}
            />
          </div>
          <Button
            className="hover:opacity-80 duration-200"
            label="+ Cadastrar novo"
            onClick={() => {
              router.push("/collaborator/form");
            }}
          />
        </div>
        <div className=" bg-slate-100 mt-4"></div>
      </div>




      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row}
                setSelectedItem={setSelectedItem}
                setMessageError={setMessageError}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex items-center  justify-center">
        <Pagination
          activeLinkClass="bg-[#0cbcbe] p-3  text-white rounded-full"
          itemClass="mx-3"
          innerClass="flex mt-4 p-3"
          totalItemsCount={pagination.totalElements}
          activePage={pagination.pageNumber}
          itemsCountPerPage={pagination.pageSize}
          onChange={(pageNumber) => {
            searchCollaborator(
              pagination.searchTerm,
              pageNumber,
              pagination.pageSize
            );
          }}
        />
      </div>
      <PureModal
        header="Deletar item"
        isOpen={!!selectedItem.id}
        className="w-96"
        closeButton={
          <VscChromeClose size={20} className="text-gray-700 mt-1" />
        }
        onClose={() => {
          setSelectedItem({});
          setInputValue("");
        }}
      >
        <div className="flex flex-col " style={{ maxWidth: 300 }}>
          <p className="leading-5 mb-5 break-normal text-center">
            Deseja deletar este item?
          </p>
          <Input
            value={inputValue}
            onChange={(e: any) => {
              setInputValue(e.target.value);
              setMessageError("");
            }}
            placeholder='Digite "Confirmar" para deletar item'
            type="text"
            className="border border-solid border-gray-400 rounded-md py-3 px-4 mb-4"
          />
          {messageError && <p className="text-red-400 ">{messageError}</p>}
          <button
            className="bg-gray-800 rounded-full py-3 text-white outline-none"
            onClick={() => {
              deleteFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  );
};

export default CollaboratorList;
