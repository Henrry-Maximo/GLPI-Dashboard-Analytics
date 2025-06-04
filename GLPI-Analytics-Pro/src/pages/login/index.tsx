import { Password, User } from 'phosphor-react';
import styles from './style.module.css';

import { useState } from 'react';
import logo from '../../assets/login/logo.png';

import { useMutation } from '@tanstack/react-query';
import { login } from '../../http/auth';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  token: string;
  name: string; // Defina aqui o campo 'name'
}

export const Index = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // redirecionamento para home (já logado)

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: data => {
      if (data.token) {
        const decoded = jwtDecode<CustomJwtPayload>(data.token);
        const { name } = decoded;

        sessionStorage.setItem('jwt', data.token);
        sessionStorage.setItem('name', name);

        // Redireciona o usuário
        navigate('/main/home');
      }
    },

    onError: (error: Error) => {
      // Captura a mensagem do erro e exibe
      setErrorMessage(error.message);
    },
  });

  // Handler do envio do formulário
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataLogin = {
      username: user,
      password: password,
    };

    // Chama a mutação para fazer o login
    mutation.mutate(dataLogin);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageLogin}>
          <img src={logo} alt="logo glpi" />
        </div>

        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="user"
                required
                maxLength={25}
                value={user}
                onChange={e => setUser(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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

          {errorMessage && (
            <p className="flex gap-2 items-center bg-gray-500 text-white p-2 border-x-2 rounded-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
              </span>

              {errorMessage}
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
}
