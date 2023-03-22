import React, { useEffect, useState } from "react";
import Input from "../../input";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "../../../http";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";

interface Props {
  initialData?: object;
}

const CollaboratorForm: React.FC<Props> = ({ initialData }) => {
  const [collaborator, setCollaborator] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(
      OrganizationService.CollaboratorForm({ ...collaborator }),
      {
        pending: "Verificando dados",
        success: {
          render() {
            return "Salvo com sucesso";
          },
          icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
          theme: "colored",
        },
        error: {
          render() {
            return "Falha ao salvar";
          },
          icon: <MdWarning size={22} className="text-yellow-200" />,
          theme: "colored",
        },
      }
    );
    setTimeout(() => {
      router.push("/collaborator/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value;
    const firstLetter = value.charAt(0).toUpperCase();
    const restWord = value.slice(1);
    setCollaborator({
      ...collaborator,
      [name]: firstLetter + restWord,
    });
  };

  const handlePhone = (event: any) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setCollaborator({ ...collaborator, cellphone: value });
    return value;
  };

  return (
    <>
      <form>
        <Input
          label="Nome"
          value={collaborator.name}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="Nome"
          onChange={(e: any) => handleInputValue(e, "name")}
        />
        <Input
          label="Telefone"
          value={collaborator.cellphone}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="(44)99932-0453"
          onChange={(e: any) => handlePhone(e)}
          maxlength={15}
        />
        <Input
          label="Email"
          type="email"
          value={collaborator.email}
          className="border border-slate-400  mb-5 shadow-xl"
          placeholder="Email@gmail.com"
          onChange={(e: any) => handleInputValue(e, "email")}
        />
        <div>
          <input
            className={` w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 
            rounded-full focus:ring-blue-500 dark:focus:ring-blue-600`}
            checked={collaborator.supervisor}
            value={collaborator.supervisor}
            type="checkbox"
            onChange={(e: any) =>
              setCollaborator({ ...collaborator, supervisor: e.target.checked })
            }
          />
          <span className="ml-2 text-gray-900 text-2xl">Supervisor</span>
        </div>
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!collaborator.name}
          className={`w-96  ${collaborator.name
              ? " bg-[#0cbcbe] hover:bg-[#53aeb0]"
              : "bg-[#507879]"
            } outline-none transition ease-in-out delay-100 text-white font-bold py-4 border-none rounded-full`}
          type="button"
          onClick={handleSubmitChange}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default CollaboratorForm;
