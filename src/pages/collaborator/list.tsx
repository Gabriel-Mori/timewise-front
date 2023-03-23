import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi2";
import http from "../../http";
import CollaboratorList from "../../components/Employee/list-employee";

const ListPage: NextPage = () => {
  const [clientFiltered, setClientFiltered] = useState([]);

  const router = useRouter();

  const handleInputSearch = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    if (!value) return;
    http
      .get(`/client/findby/${value}`)
      .then((response) => setClientFiltered(response.data.content));
  };

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de colaboradores</label>
        <CollaboratorList />
      </div>
    </Base>
  );
};

export default ListPage;
