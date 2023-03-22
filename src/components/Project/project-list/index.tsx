import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BiTimer } from "react-icons/bi";
import { useRouter } from "next/router";
import moment from "moment";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp, IoSearchOutline } from "react-icons/io5";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../input";
import Button from "../../Button";
import { ProjectService } from "../../../services/project-service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from "@mui/material";


interface Props {
  projectName?: string;
  id?: string;
  startDate?: string;
  endDate?: string;
}

interface ProjectProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  content: [];
  pageable?: any;
  searchTerm?: string;
  id?: string
}

const ProjectsList: React.FC<Props> = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<ProjectProps>({
    pageNumber: 1,
    pageSize: 3,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const getListProjects = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 3
  ) => {
    ProjectService.getProject(searchTerm, pageSize, pageNumber).then(
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


  useEffect(() => {
    getListProjects();
  }, []);



  const deleteProjectFromList = async () => {
    if (inputValue === "Confirmar") {
      try {
        await ProjectService.deleteProject(deletedItem.id);
        toast.success("Item deletado", {
          position: "top-right",
          icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
          autoClose: 2000,
          theme: "colored",
        });
        getListProjects();
        setShowModal(false);
      } catch (error) {
        setMessageError("Projeto vinculado a um lançamento!");
      }
    } else {
      setMessageError("Digite 'Confirmar' para deletar item");
    }
  };

  const handleInputSearch = (e: any) => {
    const { value } = e.target;
    getListProjects(value);
  };

  const edit = (id: any) => {
    router.push(`/projects/edit/${id}`);
  };


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
              router.push("/projects/form");
            }}
          />
        </div>
        <div className=" bg-slate-100 mt-4"></div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data inicio</TableCell>
              <TableCell>Data final</TableCell>
              <TableCell>Status</TableCell>
              <TableCell >Editar</TableCell>
              <TableCell >Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagination.content.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.projectName}
                </TableCell>
                <TableCell>{row.startDate ? moment(row.startDate).format("DD/MM/YYYY") : <BiTimer className="ml-5" size={24} />}</TableCell>
                <TableCell>{row.endDate ? moment(row.endDate).format("DD/MM/YYYY") : <BiTimer className="ml-5" size={24} />}</TableCell>
                {/* <TableCell>{row.active}</TableCell> */}
                <TableCell>
                  {
                    <div>
                      <Tooltip
                        title={
                          <div>
                            {row.active ? "ativo" : "inativo"}
                          </div>
                        }
                        placement="bottom"
                        arrow
                        enterDelay={400}
                        leaveDelay={400}
                      >

                        <div className={`flex items-center justify-center  text-white ml-1 cursor-pointer w-8 h-8 ${row.active === true ? 'bg-green-600' : 'bg-danger'}  rounded-full`}>
                          <span className=" text-lg">
                            {row.active ? "A" : "I"}
                          </span>
                        </div>

                      </Tooltip>
                    </div>

                  }
                </TableCell>
                <TableCell>
                  {
                    <div className="flex items-center text-gray-500 ">
                      <label className="ml-2 cursor-pointer">
                        <FiEdit
                          size={22}
                          onClick={() => {
                            edit(row.id);
                          }}
                        />
                      </label>
                    </div>}
                </TableCell>
                <TableCell >
                  {
                    <div className=" text-gray-500 ">
                      <button
                        className="cursor-pointer ml-4 hover:text-red-500 duration-200"
                        onClick={() => {
                          setMessageError("");
                          setDeletedItem(row);
                          setShowModal(true);
                        }}
                      >
                        <FiTrash size={22} />
                      </button>
                    </div>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex items-center  justify-center">
        {pagination.content.length > 0 && (

          <Pagination
            activeLinkClass="bg-secondary p-3 h-8 w-8 text-white rounded-full"
            itemClass="mx-3"
            innerClass="flex mt-4 p-3 "
            totalItemsCount={pagination.totalElements}
            activePage={pagination.pageNumber}
            itemsCountPerPage={pagination.pageSize}
            onChange={(pageNumber) => {
              getListProjects(
                pagination.searchTerm,
                pageNumber,
                pagination.pageSize
              );
            }}
          />
        )}
      </div>
      <PureModal
        header="Deletar item"
        isOpen={showModal}
        closeButton={
          <VscChromeClose size={20} className="text-gray-700 mt-1" />
        }
        onClose={() => {
          setShowModal(false);
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
          {messageError && <p className="text-red-400">{messageError}</p>}
          <button
            className="bg-gray-800 rounded-full py-3 text-white outline-none"
            onClick={() => {
              deleteProjectFromList();
            }}
          >
            Deletar
          </button>
        </div>
      </PureModal>
    </div>
  )
};

export default ProjectsList;
