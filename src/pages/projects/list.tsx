import type { NextPage } from "next";
import Base from "../../components/Base";
import { useRouter } from "next/router";
import ProjectsList from "../../components/Project/project-list";

const ListPage: NextPage = () => {
  const router = useRouter();

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de Projetos</label>
        <ProjectsList />
      </div>
    </Base>
  );
};

export default ListPage;
