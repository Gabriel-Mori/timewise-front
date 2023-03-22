import React, { useEffect, useState } from "react";
import employess from "../../mock/employee.json";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoIosConstruct } from "react-icons/io";
import { OrganizationService } from "../../services/organizations-service";
import moment from "moment";

interface TimelineProps {
  id: number;
}

interface EmployeeProps {
  name?: string;
  email?: string;
  cellphone?: number;
  supervisor?: boolean;
}

const TimelinePage: React.FC<TimelineProps> = ({ id }) => {
  const router = useRouter();
  const [elements, setElements] = useState([]);
  const [employee, setEmployee] = useState<EmployeeProps>({});

  const getHistoryCollaborator = () => {
    OrganizationService.timelineHandle(id).then((response) => {
      setElements(response.data?.content);

      if (response.data?.content.length > 0) {
        setEmployee(response.data?.content[0].employee);
      } else {
        OrganizationService.getCollaboratorById(id).then((resp) =>
          setEmployee(resp.data)
        );
      }
    });
  };



  useEffect(() => {
    getHistoryCollaborator();
  }, []);

  let finishStyles = { background: "#06D6A0" };
  let iconEditStyles = { background: "#f9c74f" };

  const iconEdit = <IoIosConstruct />;
  const finish = <IoCheckmarkDoneSharp />;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex h-screen bg-[#0cbcbe] flex-col  justify-center   items-center">
        <button
          className={` text-gray-700 dark:text-white `}
          onClick={() => {
            router.push("/collaborator/list");
          }}
        >
          <div className="flex items-center ml-80 ">
            <RiArrowGoBackLine />
            <h3 className="ml-3 text-1xl mr-4"> Voltar</h3>
          </div>
        </button>
        <div className="flex flex-col">
          <img className="w-24 mr-20" src="/img/user-default.png" alt="logo" />
          <label className="mb-3 mt-4">
            Nome:
            <span className="text-white ml-4">{employee.name}</span>
          </label>
          <label className="mb-3 mt-4">
            Email:
            <span className="text-white ml-4">{employee.email}</span>
          </label>
          <label className="mb-3 mt-4">
            Telefone:
            <span className="text-white ml-4">{employee.cellphone}</span>
          </label>
          <label className="mb-3 mt-4">
            Supervisor:
            <span className="text-white ml-4">
              {employee.supervisor ? "Sim" : "Não"}
            </span>
          </label>
        </div>
      </div>
      <div className="bg-[#F5F3EE]  w-screen   overflow-y-scroll flex justify-center items-center ">
        <div className="h-screen text-white">
          <VerticalTimeline className="">
            {elements.map((element: any) => {
              let isWorkIcon = element.icon === iconEdit;
              return (
                <VerticalTimelineElement
                  key={element.id}
                  contentStyle={{
                    background: "#E3E3E3",
                    boxShadow: "1px solid ",
                    color: "#fff",
                    width: "380px",
                    marginLeft: "-420px",
                    marginRight: "-420px",
                    height: "150px",
                  }}
                  className="h-40 "
                  // date={}
                  // dateClassName="date text-gray-500  "
                  iconStyle={isWorkIcon ? iconEditStyles : finishStyles}
                  icon={
                    isWorkIcon ? <IoIosConstruct /> : <IoCheckmarkDoneSharp />
                  }
                >
                  <h1 className="text-gray-900  w-96 mb-2">
                    Horas:
                    <span className="text-gray-600 ml-3">
                      {element.hoursWorked ? element.hoursWorked : "Sem horas"}
                    </span>
                  </h1>

                  <h1 className="text-gray-900 w-96 mb-2 ">
                    Status:
                    <span className="text-gray-600 ml-3">{element.status}</span>
                  </h1>

                  <h1 className="text-gray-900 w-96 mb-2 ">
                    Descrição:
                    <span className="text-gray-600 ml-3">
                      {element.description}
                    </span>
                  </h1>

                  <h1 className="text-gray-900 w-96 ">
                    Data:
                    <span className="text-gray-600 ml-3">
                      {moment(element.date).format("DD/MM/yyyy")}
                    </span>
                  </h1>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};
export default TimelinePage;
