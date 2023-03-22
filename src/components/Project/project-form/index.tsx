import React, { useState } from "react";
import Input from "../../input";
import Label from "../../Label";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";
import Panel from "../../Panel";
import Button from "../../Button";
import DatePick from "../../Date";
import { ProjectService } from "../../../services/project-service";


interface Props {
  initialData?: any;
}

const FormProject: React.FC<Props> = ({ initialData }: any) => {
  const [project, setProject] = useState<any>(initialData || {});
  const router = useRouter();

  const submitForm = async () => {
    await toast.promise(
      ProjectService.saveProject({
        ...project,
        active: project?.id ? project.active : true,
      }),
      {
        pending: "Verificando dados",

        success: {
          render() {
            return "Salvo com sucesso";
          },
          icon: (
            <IoCheckmarkDoneSharp size={22} className="text-green-900 ml" />
          ),
          theme: "colored",
        },

        error: {
          render() {
            return "Falha ao Salvar";
          },
          icon: <MdWarning size={22} className="text-yellow-200" />,
          theme: "colored",
        },
      }
    );
    setTimeout(() => {
      router.push("/projects/list");
    }, 1000);
  };

  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value;
    const firstLetter = value.charAt(0).toUpperCase();
    const restWord = value.slice(1);
    setProject({
      ...project,
      [name]: firstLetter + restWord,
    });
  };

  return (
    <>
      <Panel>
        <form className="w-full">
          <div className="flex">
            <div className="flex-1 mr-5  ">
              <Input
                className="border border-gray-400"
                label="Projeto"
                value={project.projectName}
                placeholder="Informe o nome do projeto"
                onChange={(e: any) => handleInputValue(e, "projectName")}
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <Label label="Datas" />
          </div>
          <div className="flex justify-start mb-3 ">
            <div className=" flex items-center">
              <Label label="De:" />

              <div className="ml-5">
                <DatePick
                  onChange={(e: any, value: any) => {
                    setProject({ ...project, startDate: value });
                  }}
                  value={project.startDate}
                />
              </div>
            </div>

            <div className="flex items-center ml-5">
              <Label label=" Até:" />

              <div className="ml-5">
                <DatePick
                  disabled={!project.startDate}
                  onChange={(e: any, value: any) => {
                    setProject({ ...project, endDate: value });
                  }}
                  value={project.endDate}
                />
              </div>
            </div>
          </div>
          {project?.id && (
            <div className="flex items-center mt-5">
              <input
                id="status"
                className={` w-5 h-5 text-seconda bg-gray-100 border-gray-300 
                            rounded-full focus:ring-secondary dark:focus:ring-secondary cursor-pointer`}
                checked={project.active}
                type="checkbox"
                onChange={(e: any) =>
                  setProject({
                    ...project,
                    active: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="status"
                className="ml-2 text-gray-900 cursor-pointer"
              >
                Ativo
              </label>
            </div>
          )}
        </form>
      </Panel>
      <div className="flex justify-center mt-16">
        <Button
          onClick={submitForm}
          label="Salvar"
          disabled={false}
          cancel={() => router.push("/projects/list")}
        />
      </div>
    </>
  );
};

export default FormProject;
