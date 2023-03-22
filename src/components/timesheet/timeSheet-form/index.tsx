import React, { useEffect, useState } from "react";
import Input from "../../input";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "../../../http";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";
import Label from "../../Label";
import Select from "../../Select";
import KgDatePicker from "../../KgDatePicker";

interface Props {
  initialData?: any;
}

const TimeSheetForm: React.FC<Props> = ({ initialData }: any) => {
  const [timesheet, setTimeSheet] = useState<any>(initialData || {});
  const router = useRouter();

  const handleSubmitChange = async () => {
    await toast.promise(OrganizationService.timeSheetSubmit({ ...timesheet }), {
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
      router.push("/timesheet/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    setTimeSheet({
      ...timesheet,
      [name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
    });
  };

  const getEmployee = (searchTerm: any = "") => {
    return http.get(`/employee/v2?searchTerm=${searchTerm}`).then((resp) => {
      return resp.data.content;
    });
  };

  return (
    <>
      <form>
        <Input
          label="Descrição"
          type="textarea"
          value={timesheet.description}
          className={`border border-slate-400  mb-5 shadow-xl`}
          placeholder="Realizado troca de label ..."
          onChange={(e: any) => handleInputValue(e, "description")}
        />

        <div className="w-full mr-4 ">
          <Label label="Colaborador" />
          <Select
            placeholder="Selecione o Colaborador"
            onChange={(_, value) => {
              setTimeSheet({ ...timesheet, employee: value });
            }}
            fetch={getEmployee}
            value={timesheet.employee}
            fieldLabel="name"
          />
        </div>

        <div className=" mt-5  mb-4">
          <Label label="Registro" />
        </div>
        <div className="flex items-center justify-start  h-7">
          <div className=" flex items-center">
            <label className="mr-2 dark:text-white text-4xl sm:text-base font-semibold text-font-color-light-gray">
              Dia:
            </label>
            <KgDatePicker
              onChange={(e: any, value: any) => {
                setTimeSheet({ ...timesheet, date: value });
              }}
              value={timesheet.date}
            />
          </div>
          <div className="ml-10">
            <label className="mr-2 dark:text-white text-4xl sm:text-base font-semibold text-font-color-light-gray">
              Horas:
            </label>
            <input
              type="time"
              value={timesheet.hoursWorked}
              className={`border rounded-md border-slate-400 outline-none p-3 h-11 w-60 shadow-xl bg-gray-200`}
              onChange={(e: any) => handleInputValue(e, "hoursWorked")}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-16">
        <button
          className={`w-96   bg-[#0cbcbe] hover:bg-[#53aeb0]  outline-none transition ease-in-out delay-200 text-white font-bold py-4 border-none rounded-full`}
          type="button"
          onClick={handleSubmitChange}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default TimeSheetForm;
