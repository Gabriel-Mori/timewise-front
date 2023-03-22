import React, { useState } from 'react'
import Input from '../../input'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { MdWarning } from 'react-icons/md'
import Select from '../../Select'
import { CustomerService } from '../../../services/customer-service'
import Panel from '../../Panel'
import Button from '../../Button'
import { ProjectService } from '../../../services/project-service'

interface Props {
  initialData?: any
}

const ClientForm: React.FC<Props> = ({ initialData }: any) => {
  const [customer, setCustomer] = useState<any>(initialData || {})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  console.log('cus', customer)
  const handleSubmitChange = async () => {
    setIsLoading(true)

    await toast.promise(
      CustomerService.saveCustomer({ ...customer, active: true }).finally(() =>
        setIsLoading(false),
      ),
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
      router.push('/clients/list')
    }, 1000)
  }

  const handleInputValue = (e: any, name: string) => {
    const value = e.target.value
    const firstLetter = value.charAt(0).toUpperCase()
    const restWord = value.slice(1)
    setCustomer({
      ...customer,
      [name]: firstLetter + restWord,
    })
  }

  const getProject = (searchTerm?: any) => {
    return ProjectService.getProject(searchTerm).then((resp) => {
      return resp.data.content
    })
  }

  return (
    <>
      <Panel>
        <form className="w-full">
          <Input
            className="border mb-2 border-gray-400"
            label="Nome"
            value={customer.name}
            placeholder="João"
            onChange={(e: any) => handleInputValue(e, 'name')}
          />

          <div className="flex w-full mb-2">
            <div className=" flex-1">
              <Input
                className="border border-gray-400"
                label="Email"
                type="email"
                value={customer.email}
                placeholder="Email@gmail.com"
                onChange={(e: any) => handleInputValue(e, 'email')}
              />
            </div>
            <div className="ml-5 flex-1">
              <Input
                className="border border-gray-400"
                label="Telefone"
                type="tel"
                value={customer.phone}
                placeholder="(44) 99999-9999"
                onChange={(e: any) => handleInputValue(e, 'phone')}
              />
            </div>
          </div>

          <div className=" mb-5">
            <Select
              label="Projeto"
              placeholder="Informe o projeto"
              onChange={(_, value) => {
                setCustomer({ ...customer, projects: value })
              }}
              value={customer.projects}
              fetch={getProject}
              fieldLabel="projectName"
              isMulti={true}
            />
          </div>



        </form>
      </Panel>
      <div className="flex justify-center mt-16">
        <Button
          disabled={!customer.name || isLoading}
          onClick={handleSubmitChange}
          label="Salvar"
          cancel={() => router.push('/clients/list')}
        />
      </div>
    </>
  )
}

export default ClientForm
