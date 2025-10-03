import { KeyRound, User } from "lucide-react";
import { Label } from "@/components/ui/label";

import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

// interface CustomJwtPayload extends JwtPayload {
//   token: string;
//   name: string;
// }

export const Login = () => {
  // const [formData, setFormData] = useState({ username: "", password: "" });
  // const [warning, setWarning] = useState("");

  // função para receber erro e limpar depois de um tempo
  // function warningSubmit(message: string) {
  //   setWarning(message);
  //   setTimeout(() => {
  //     setWarning("");
  //   }, 5000);
  // }

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    navigate("/home");

    // try {
    //   if (!username.trim() || !password.trim()) {
    //     return warningSubmit("Fill in all fields.");
    //   }

    //   const { token } = await PostSession({ username, password });

    //   if (!token) {
    //     return warningSubmit("Username or password incorrect!");
    //   }

    // const decoded = jwtDecode<CustomJwtPayload>(token);
    // const { name } = decoded;

    // TODO FIX: Cookies HttpOnly  / Protection against multiple login attempts
    // const storage = rememberMe ? localStorage : sessionStorage;
    // storage.setItem("jwt", token);
    // storage.setItem("name", name);

    // navigate("/main/home");
    // } catch (error) {
    //   warningSubmit("Error in connection. Try again.");
    // }
  }

  return (
    <div className="flex h-screen w-full border-t border-orange-500 bg-gray-100">
      <div className="mx-auto flex flex-row-reverse items-center justify-center gap-40 text-center max-md:flex-col max-md:gap-8 max-md:p-4">
        <div className="imageLogin">
          <img
            src={logo}
            alt="Logo GLPI"
            className="h-[15.25rem] w-[30rem] max-md:h-auto max-md:w-80"
          />
        </div>

        <form
          className="flex flex-col items-center gap-12 p-4 text-center max-md:w-full max-md:gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-[35px] max-md:gap-5">
            <div className="relative flex items-center gap-2">
              <User
                size={24}
                className="pointer-events-none absolute left-2 -translate-y-[10%] text-gray-700 transition-all duration-300"
              />
              <input
                type="text"
                required
                autoFocus
                maxLength={25}
                className="peer flex-1 border-b border-gray-300 bg-transparent py-2 pl-10 pr-2 text-gray-700 outline-none transition-all duration-300 hover:border-b-2 hover:border-orange-500 focus:border-b-2 focus:border-orange-500"
                id="username"
              />
              <label
                htmlFor="username"
                className="pointer-events-none absolute left-10 text-base transition-all duration-300 peer-valid:-translate-y-[130%] peer-valid:text-sm peer-valid:text-orange-500 peer-focus:-translate-y-[130%] peer-focus:text-sm peer-focus:text-orange-500"
              >
                Usuário
              </label>
            </div>

            <div className="relative flex items-center gap-2">
              <KeyRound
                size={24}
                className="pointer-events-none absolute left-2 -translate-y-[10%] text-gray-700 transition-all duration-300 focus:border-orange-500"
              />
              <input
                type="password"
                required
                autoFocus
                maxLength={25}
                className="peer flex-1 border-b border-gray-300 bg-transparent py-2 pl-10 pr-2 text-gray-700 outline-none transition-all duration-300 hover:border-b-2 hover:border-orange-500 focus:border-b-2 focus:border-orange-500"
                id="password"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-10 text-base transition-all duration-300 peer-valid:-translate-y-[130%] peer-valid:text-sm peer-valid:text-orange-500 peer-focus:-translate-y-[130%] peer-focus:text-sm peer-focus:text-orange-500"
              >
                Senha
              </label>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-12 max-md:gap-5">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="rememberMe"
                className="relative h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-700 bg-transparent checked:border-none checked:bg-orange-500 checked:before:mx-auto checked:before:block checked:before:h-2.5 checked:before:w-1.5 checked:before:rotate-45 checked:before:border-b-2 checked:before:border-r-2 checked:before:border-gray-200 checked:before:content-['']"
              />
              <Label htmlFor="rememberMe" className="text-gray-700">
                Lembrar de mim
              </Label>
            </div>

            <a
              href="/reset-password"
              className="font-normal text-gray-700 no-underline hover:text-orange-500"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="w-4/5 cursor-pointer rounded border-none bg-white py-2.5 font-normal text-gray-700 transition-all duration-500 hover:bg-orange-500 hover:text-white max-md:w-full"
          >
            Acessar
          </button>

          <div className="mt-16 flex flex-col">
            <a
              href="/register"
              className="font-normal text-gray-700 no-underline hover:text-orange-500"
            >
              Criar conta.
            </a>
            <a
              href="/help"
              className="font-normal text-gray-700 no-underline hover:text-orange-500"
            >
              Precisa de ajuda?
            </a>
            <footer className="font-normal text-gray-700 no-underline">
              Painel de Gestão Técnica &copy; GLPI - {new Date().getFullYear()}
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
};
