import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useUser } from '../../contexts/UserContext'
import { CaretDown, Moon, SignOut, Sun } from 'phosphor-react'
import { menuConfig } from '../../menu-config'
import Image from 'next/image'

type Props = {
  children: JSX.Element
}

const Base: React.FC<Props> = ({ children }) => {
  const { theme, toogleTheme } = useTheme()
  const [showOptions, setShowOptions] = useState(false)
  const handleLogout = () => {
    setCookie(null, 'authorization', '', {
      maxAge: 2147483647,
      path: '/',
    })
    localStorage.removeItem('kgo-selected-organization')

    router.push('/login')
  }
  const user = useUser()

  const router = useRouter()
  const setNewMenu = (item: any) => {
    router.push(item.url)
  }

  const pictureProfile = user?.picture?.bytes
    ? `data:${user?.picture?.mimeType};base64,${user?.picture?.bytes}`
    : '/img/user-default.png'

  const logo = '/img/timewise.jpeg'

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white">
        <div className="container mx-auto md:p-0 px-5 w-screen ">
          <header className="flex flex-col items-center  md:flex-row  md:justify-between py-4">
            <div
              className="flex flex-col items-center xl:flex-row justify-between w-full md:w-auto cursor-pointer"
              onClick={() => router.push('/')}
            >
              <Image src={logo} width={190} height={80} alt="logo" />
            </div>
            <div className="flex">
              <div className="flex flex-1 items-center justify-between w-full md:w-auto mt-8 md:mt-0 md:ml-2">
                <div className="flex-1 md:mx-12">
                  <ul className="flex">
                    {menuConfig.map((item) => (
                      <li
                        key={item.type}
                        className={`mr-10 rounded-full px-6 py-2 cursor-pointer ${!router.asPath.includes(item.activeUrl)
                          ? 'text-gray-900 hover:bg-gray-200'
                          : ' bg-primary text-white'
                          }`}
                        onClick={() => setNewMenu(item)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex mt-6 md:mt-0">
              <div className="flex justify-center items-center">
                <Image
                  height={48}
                  width={48}
                  className=" rounded-full"
                  src={pictureProfile}
                  alt="user"
                />
                <div
                  className="flex items-center ml-4 relative cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  {showOptions && (
                    <>
                      <div
                        className="h-screen w-screen fixed inset-0 bg-transparent"
                        onClick={() => setShowOptions(false)}
                      ></div>
                      <ul className="absolute top-8 right-0 w-36 bg-white overflow-hidden dark:bg-intensive-black text-gray-900 dark:text-white border border-gray-400 rounded-md">
                        <li
                          className={`flex justify-between w-full  dark:border-gray-50 px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-500 mb-2`}
                          onClick={() => toogleTheme()}
                        >
                          {theme === 'dark' ? 'Claro' : 'Escuro'}
                          {theme === 'dark' ? (
                            <Sun className="text-primary" size={22} />
                          ) : (
                            <Moon className="text-slate-600" size={22} />
                          )}
                        </li>
                        <li
                          className={`flex justify-between w-full  dark:border-gray-50 px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-500 `}
                          onClick={handleLogout}
                        >
                          Sair
                          <SignOut className="text-danger" size={22} />
                        </li>
                      </ul>
                    </>
                  )}
                  <span className="mr-4 text-gray-900 dark:text-white">
                    {user.name?.split(" ")[0]}
                  </span>
                  <CaretDown className=" dark:text-white " size={22} />
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <main className="bg-gray-ultra-light flex-1   overflow-hidden">
        <div className="container mx-auto  md:px-0 h-screen w-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Base
