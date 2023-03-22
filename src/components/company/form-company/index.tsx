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
  initialData?: any;
}

const CompanyFormIsFrom: React.FC<Props> = ({ initialData }: any) => {
  const [company, setCompany] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(OrganizationService.companySubmit({ ...company }), {
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
          return "Falha ao Salvar";
        },
        icon: <MdWarning size={22} className="text-yellow-200" />,
        theme: "colored",
      },
    });
    setTimeout(() => {
      router.push("/company/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value;
    const firstLetter = value.charAt(0).toUpperCase();
    const restWord = value.slice(1);
    setCompany({
      ...company,
      [name]: firstLetter + restWord,
    });
  };

  const handlePhone = (event: any) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = (value: any) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setCompany({ ...company, cellphone: value });
    return value;
  };

  return (
    <>
      <form>
        <Input
          label="Nome"
          value={company.companyName}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="Grupo irrah"
          onChange={(e: any) => handleInputValue(e, "companyName")}
        />

        <Input
          label="Cidade"
          type="city"
          value={company.city}
          className="border border-slate-400  mb-5 shadow-xl"
          placeholder="New York"
          onChange={(e: any) => handleInputValue(e, "city")}
        />
        <Input
          label="CNJP"
          type="cnpj"
          maxlength={18}
          value={company.cnpj}
          className="border border-slate-400  mb-5 shadow-xl"
          placeholder="89.173.004/0001-85"
          onChange={(e: any) => handleInputValue(e, "cnpj")}
        />
        <Input
          label="Telefone"
          type="tel"
          maxlength={15}
          value={company.cellphone}
          className="border border-slate-400  mb-5 shadow-xl "
          placeholder="(44)99932-3213"
          onChange={(e: any) => handlePhone(e)}
        />
      </form>
      <div className="flex justify-center mt-16">
        <button
          disabled={!company.companyName}
          className={`w-96  ${company.companyName
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

export default CompanyFormIsFrom;
