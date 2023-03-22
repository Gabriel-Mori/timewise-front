import type { NextPage } from "next";
import Base from "../../components/Base";
import ClientList from "../../components/ProfileData/list-client";

const ListPage: NextPage = () => {

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de Clientes</label>
        <ClientList />
      </div>
    </Base>
  );
};

export default ListPage;
