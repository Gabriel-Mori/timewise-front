import { ProjectsInterface } from "./projects.interface";

export interface EmployeeInterface {
  role: EmployeeRole;
  name: string;
  email: string;
  phone: string;
  active: boolean
  projects: ProjectsInterface

}

export type EmployeeRole =
  'ROLE_ADMIN' |
  'ROLE_SUPERVISOR'


