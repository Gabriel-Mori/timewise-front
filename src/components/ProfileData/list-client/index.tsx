import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "../../../http";
import Pagination from "react-js-pagination";
import { VscChromeClose } from "react-icons/vsc";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import Input from "../../input";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp, IoSearchOutline } from "react-icons/io5";
import { CustomerService } from "../../../services/customer-service";
import Button from "../../Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from "../Row";

interface Props {
  name?: string;
  id?: number;
  email?: string;
  phone?: string;
  active?: boolean;
  projects?: any;
}


interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  searchTerm?: string;
}

const ClientList: React.FC<Props> = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [rows, setRows] = useState<Props[]>([])
  const [pagination, setPagination] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const searchClients = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 10
  ) => {
    CustomerService.getCustomer(searchTerm, pageSize, pageNumber).then(
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


  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    searchClients(value);
  };

  const deleteClientFromList = async () => {
    console.log('chamo')
    if (inputValue === "Confirmar") {
      await http.delete(`/customer/${deletedItem.id}`);
      toast.success("Item deletado", {
        position: "top-right",
        icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
        autoClose: 2000,
        progress: undefined,
        theme: "colored",
      });
      searchClients();
      setShowModal(false);
    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
  };

  useEffect(() => {
    searchClients();
  }, []);

  useEffect(() => {
    const newRows: any = pagination.content.map((rows) => createData(rows))
    setRows(newRows)
  }, [pagination]);

  const edit = (id: any) => {
    router.push(`/clients/edit/${id}`);
  };


  return (
    <div>
      <div className="mt-8">
        <div className="flex justify-between items-end mb-6">
          <div className="w-full mr-5">
            <Input
              className="border border-gray-300 "
              placeholder="Pesquise por nome do cliente"
              icon={<IoSearchOutline className="font-gray-medium" />}
              onChange={(e: any) => handleInputSearch(e)}
            />
          </div>
          <Button
            className="hover:opacity-80 duration-200"
            label="+ Cadastrar novo"
            onClick={() => {
              router.push("/clients/form");
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
                setDeletedItem={setDeletedItem}
                setMessageError={setMessageError}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex items-center  justify-center">
        <Pagination
          activeLinkClass="bg-[#0cbcbe] p-3 text-white rounded-full"
          itemClass="mx-3"
          innerClass="flex mt-4 p-3"
          totalItemsCount={pagination.totalElements}
          activePage={pagination.pageNumber}
          itemsCountPerPage={pagination.pageSize}
          onChange={(pageNumber) => {
            searchClients(
              pagination.searchTerm,
              pageNumber,
              pagination.pageSize
            );
          }}
        />
      </div>

      <PureModal
        header="Deletar item"
        isOpen={!!deletedItem.id}
        closeButton={
          <VscChromeClose size={20} className="text-gray-700 mt-1" />
        }
        onClose={() => {
          setDeletedItem({});
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
              deleteClientFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  );
};

export default ClientList;
