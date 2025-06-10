import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "@/http/auth";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

import styles from "./style.module.css";

import { Password, User } from "phosphor-react";
import logo from "../../assets/login/logo.png";

interface CustomJwtPayload extends JwtPayload {
  token: string;
  name: string;
}

export const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { token } = await Login({ username, password });

    if (!token || token.length === 0) {
      setWarning("Username or passord incorrect!");

      setTimeout(() => {
        setWarning('');
      }, 5000) // 5 segundos

      return;
    }

    const decoded = jwtDecode<CustomJwtPayload>(token);
    const { name } = decoded;

    sessionStorage.setItem("jwt", token);
    sessionStorage.setItem("name", name);

    navigate("/main/home");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageLogin}>
          <img src={logo} alt="logo glpi" />
        </div>

        <form
          className={styles.formLogin}
          onSubmit={handleLogin}
        >
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                required
                autoFocus
                maxLength={25}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label htmlFor="text">Usuário</label>
              <User className={styles.svgGroup} size={32} />
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="password"
                required
                maxLength={16}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label htmlFor="text">Senha</label>
              <Password className={styles.svgGroup} size={32} />
            </div>
          </div>

          <div className={styles.rememberAndPassword}>
            <div className={styles.wrapperRememberMe}>
              <input type="checkbox" />
              <label htmlFor="text">Lembrar de mim.</label>
            </div>

            <div>
              <a href="/">Esqueci minha senha.</a>
            </div>
          </div>

          <button type="submit" className={styles.accessLogin}>
            Acessar
          </button>

          {warning && (
            <p className="flex gap-2 items-center bg-gray-500 text-white p-2 border-x-2 rounded-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
              </span>

              {warning}
            </p>
          )}

          {/* <div className={styles.accessHelpMargin}>
            <a href="/">
              Problemas com{" "}
              <span>
                <strong>acesso</strong>
              </span>
              ?
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
};
