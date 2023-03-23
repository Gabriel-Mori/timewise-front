import React, { useState } from 'react'
import Input from '../../input'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { MdWarning } from 'react-icons/md'
import { EmployeeService } from '../../../services/employee-service'
import Panel from '../../Panel'
import Button from '../../Button'
import Select from '../../Select'
import { ProjectService } from '../../../services/project-service'
import { EmployeeRole } from '../../../enums/EmployeeRole'

interface Props {
  initialData?: object
}




const CollaboratorForm: React.FC<Props> = ({ initialData }) => {
  const [collaborator, setCollaborator] = useState<any>(initialData || {})
  const [roles, setRoles] = useState(collaborator.roles || '')
  const router = useRouter()

  const handleSubmitChange = async () => {
    await toast.promise(
      EmployeeService.saveEmployee({ ...collaborator, active: true }),
      {
        pending: 'Verificando dados',
        success: {
          render() {
            return 'Salvo com sucesso'
          },
          icon: <IoCheckmarkDoneSharp size={22} className="text-green-900" />,
          theme: 'colored',
        },
        error: {
          render() {
            return 'Falha ao salvar'
          },
          icon: <MdWarning size={22} className="text-yellow-200" />,
          theme: 'colored',
        },
      },
    )
    setTimeout(() => {
      router.push('/collaborator/list')
    }, 1000)
  }






  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value
    const firstLetter = value.charAt(0).toUpperCase()
    const restWord = value.slice(1)
    setCollaborator({
      ...collaborator,
      [name]: firstLetter + restWord,
    })
  }

  const handlePhone = (event: any) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }

  const phoneMask = (value: string) => {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    setCollaborator({ ...collaborator, phone: value })
    return value
  }

  const getProject = (searchTerm?: any) => {
    return ProjectService.getProject(searchTerm).then((resp) => {
      return resp.data.content
    })
  }

  return (
    <>
      <Panel>
        <form>
          <div className="flex">
            <div className="flex-1 mr-5">
              <Input
                className="border border-gray-400"
                label="Nome"
                value={collaborator.name}
                placeholder="Nome"
                onChange={(e: any) => handleInputValue(e, 'name')}
              />
            </div>

            <div className="flex-1">
              <Input
                className="border border-gray-400"
                label="Telefone"
                value={collaborator.phone}
                placeholder="(44)99932-0453"
                onChange={(e: any) => handlePhone(e)}
                maxlength={15}
              />
            </div>
          </div>
          <div className="mt-4">
            <Input
              className="border border-gray-400 mb-2"
              label="Email"
              type="email"
              value={collaborator.email}
              placeholder="Email@gmail.com"
              onChange={(e: any) => handleInputValue(e, 'email')}
            />
          </div>
          <div>
            <Select
              label="Projeto"
              placeholder="Informe o projeto"
              onChange={(_, value) => {
                setCollaborator({ ...collaborator, projects: value })
              }}
              value={collaborator.projects}
              fetch={getProject}
              fieldLabel="projectName"
              isMulti={true}
            />
          </div>

          <div className='flex mt-4'>


            <button
              className={`mr-3 rounded-lg text-white dark:text-white text-1xl  px-6 py-2 w-40 h-12
              ${roles === EmployeeRole.ADMIN ? 'hover:bg-bottomHover bg-bottomm' : 'hover:bg-secondary bg-primary'}`}
              onClick={() => {
                setCollaborator({ ...collaborator, roles: EmployeeRole.ADMIN })
                setRoles(EmployeeRole.ADMIN)
              }}

              type='button'
            >
              Admin
            </button>

            <button
              className={`mr-3 rounded-lg text-white dark:text-white text-1xl  px-6 py-2 w-40 h-12
               ${roles === EmployeeRole.SUPERVISOR ? 'hover:bg-bottomHover bg-bottomm' : 'hover:bg-secondary bg-primary'}`}
              onClick={() => {
                setCollaborator({ ...collaborator, roles: EmployeeRole.SUPERVISOR })
                setRoles(EmployeeRole.SUPERVISOR)
              }}
              type='button'
            >
              Supervisor
            </button>






          </div>

        </form>
      </Panel>
      <div className="flex justify-center mt-16">
        <Button
          onClick={handleSubmitChange}
          disabled={!collaborator.name}
          label="Salvar"
          cancel={() => router.push('/collaborator/list')}
        />
      </div>
    </>
  )
}

export default CollaboratorForm
