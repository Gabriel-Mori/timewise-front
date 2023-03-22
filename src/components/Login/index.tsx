import { At, Key, SpinnerGap } from "phosphor-react";
import { useState } from "react";
import { AuthService } from "../../services/auth";
import Input from "../input";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

const Login = () => {
  const [login, setLogin] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!login.email || !login.password) {
      return setErrorMessage("Preencha usuário e senha");
    }

    try {
      setIsloading(true);
      await AuthService.login(login.email, login.password).then((resp: any) => {
        setCookie(null, "authorization", resp.token, {
          maxAge: 2147483647,
          path: "/",
        });

        router.push("/");
      });
    } catch (error: any) {
      if (
        error?.response?.data?.response === "BAD_PASSWORD" ||
        error?.response?.data?.response === "NO_USER"
      ) {
        setErrorMessage("E-mail ou senha incorretos");
      }
    } finally {
      setIsloading(false);
    }
  };

  const handleInputValue = (e: any, name: string) => {
    setLogin({ ...login, [name]: e.target.value });
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full h-full">
      <div className="flex items-center justify-center w-full px-6 md:px-0 md:w-1/2 my-10 md:my-0">
        <div className="flex flex-col w-full md:p-32">
          {/* <img
            className="w-24 mr-12"
            src="/img/bay-reservations.png"
            alt="logo"
          /> */}
          <h1 className="text-2xl font-bold mb-3">Entre na sua conta</h1>
          <h2 className="mb-8 text-gray-600">Entre com seus dados de acesso</h2>
          <Input
            label="E-mail"
            placeholder="E-mail de acesso"
            icon={<At size={16} />}
            className="w-full mb-8 border "
            value={login.email}
            onChange={(e: any) => handleInputValue(e, "email")}
          />

          <Input
            label="Senha"
            placeholder="Senha de acesso"
            icon={<Key size={16} />}
            type="password"
            className="w-full mb-4 border "
            value={login.password}
            onChange={(e: any) => handleInputValue(e, "password")}
          />
          <p className="mb-5 p-0 h-3 text-center text-red-500">
            {errorMessage}
          </p>

          {isLoading ? (
            <div className="w-full flex justify-center bg-[#0cbcbe] outline-none text-white font-bold py-4 border-none rounded-full">
              <SpinnerGap className="animate-spin" size={24} />
            </div>
          ) : (
            <button
              className="w-full bg-[#0cbcbe] outline-none text-white font-bold py-4 border-none rounded-full"
              type="button"
              onClick={handleLogin}
            >
              Entrar
            </button>
          )}

          <hr className="mt-12" />

          <p className="text-xs text-gray-600 mt-8">
            Copyright © 2023 | Integradores Grupo irrah
          </p>
        </div>
      </div>
      <div className="bg-[#F5F3EE] py-10 md:py-0 md:w-1/2 flex justify-center items-center h-screen">
        <div className="w-1/2 lg:w-2/3 xl:w-2/5 text-white">
          <h3 className="text-2xl font-bold text-left text-[#ff0057]   mb-16">
            Veja resultados de sua equipe
          </h3>
          <img
            className="w-[700px] h-[400px]"
            src="./img/Bay-reservations.png"
            alt="Login"
          />

          <ul className="text-lg mt-10">
            <li className="mb-4 flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="mr-4 text-green-400 font-bold"
                style={{ color: "#ff0057" }}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
              </svg>
              <span className=" text-[#ff0057]">Controle de horas</span>
            </li>
            <li className="mb-4 flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="mr-4 text-green-400 font-bold"
                style={{ color: "#ff0057" }}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
              </svg>
              <span className=" text-[#ff0057]">Controle de clientes</span>
            </li>
            <li className="mb-4 flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="mr-4 text-green-400 font-bold"
                style={{ color: "#ff0057" }}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
              </svg>
              <span className=" text-[#ff0057]">Análise em tempo real</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
