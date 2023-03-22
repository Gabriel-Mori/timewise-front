import React, { useEffect, useState } from "react";
import List from "../../List";
import ListColumn from "../../List/ListColumn";
import { FiEdit } from "react-icons/fi";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import http from "../../../http";
import { HiDotsVertical } from "react-icons/hi";
import Pagination from "react-js-pagination";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../input";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [inputValue, setInputValue] = useState("");
  const [messageError, setMessageError] = useState("");
  const [pagination, setPagination] = useState<CollaboratorProps>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    content: [],
    pageable: {},
    searchTerm: "",
  });

  const searchCollaborator = (
    searchTerm: any = "",
    pageNumber = 1,
    pageSize = 10
  ) => {
    OrganizationService.getCollaborator(searchTerm, pageSize, pageNumber).then(
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      searchCollaborator();
      setShowModal(false);
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

  return (
    <div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <h2 className="mb-2">Pesquise por nome do colaborador</h2>
            <input
              style={{ borderRadius: "14px" }}
              className={`bg-transparent h-14 outline-none flex-1 w-full pl-5 border border-solid border-slate-400`}
              onChange={(e: any) => handleInputSearch(e)}
            />
          </div>
          <button
            className={` text-white dark:text-white text-1xl rounded-full px-6 py-2 w-60 h-14 ml-5 mt-8 hover:bg-orange-500 bg-orange-400`}
            onClick={() => {
              router.push("/collaborator/form");
            }}
          >
            <div className="flex items-center ">
              <HiPlus size={22} />
              <h3 className="ml-3 text-1xl"> Cadastrar novo</h3>
            </div>
          </button>
        </div>
      </div>
      {pagination.content && (
        <div className="shadow-2xl border rounded bg-slate-100">
          <div className="p-2 ">
            <List
              data={pagination.content ? pagination.content : []}
              minWidth={1000}
            >
              <ListColumn
                name="name"
                label="Nome"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.name ? row.name : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />

              <ListColumn
                name="email"
                label="Email"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.email ? row.email : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="supervisor"
                label="Supervisor"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.supervisor ? "Sim" : "Não"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="cellphone"
                label="Telefone"
                render={(row) => (
                  <div>
                    <label className="text-gray-900">
                      {row.cellphone ? row.cellphone : "----"}
                    </label>
                  </div>
                )}
                align="center"
              />
              <ListColumn
                name="edit"
                label="Editar"
                render={(row) => (
                  <div className="flex  justify-end  text-gray-500 ">
                    <label className="cursor-pointer mr-1">
                      <FiEdit
                        size={22}
                        onClick={() => {
                          edit(row.id);
                        }}
                      />
                    </label>
                  </div>
                )}
                align="right"
              />
              <ListColumn
                name="delete"
                label="Deletar"
                render={(row) => (
                  <div className="flex  justify-end  text-gray-500">
                    <button className="cursor-pointer mr-2">
                      <HiTrash
                        size={22}
                        style={{ color: "#ff0000" }}
                        onClick={() => {
                          setMessageError("");
                          setSelectedItem(row);
                          setShowModal(true);
                        }}
                      />
                    </button>
                  </div>
                )}
                align="right"
              />
              <ListColumn
                name="timeline"
                label="Histórico"
                render={(row) => (
                  <div>
                    <button
                      onClick={() => {
                        setSelectedItem(row);
                        router.push(`/timeline/${row.id}`);
                      }}
                    >
                      {<HiDotsVertical />}
                    </button>
                  </div>
                )}
                align="center"
              />
            </List>
          </div>
        </div>
      )}
      <div className="flex items-center  justify-center">
        <Pagination
          activeLinkClass="bg-[#0cbcbe] p-3 text-white rounded-full"
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
        isOpen={showModal}
        className="w-96"
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
