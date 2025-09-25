import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import logo from "@/assets/logo.png";
import { User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Login = () => {
  return (
    <div className="justify-beetwen flex flex-row gap-8">
      <div>
        <img src={logo} alt="Logo GLPI" height={24} />
      </div>
      <form>
        <h1>Login</h1>

        <div>
          <Input
            type="text"
            required
            autoFocus
            maxLength={25}
            aria-lavel="Usuário"
            id="username"
            // value={username}
            // onChange={(event) => setUsername(event.target.value)}
          />
          <Label htmlFor="username">Usuário:</Label>
          <User size={32} />
        </div>

        <div>
          <Input
            type="password"
            required
            autoFocus
            maxLength={25}
            aria-lavel="Passworx"
            id="username"
          />
          <Label htmlFor="password">Usuário:</Label>
          <User size={32} />
        </div>
      </form>

      <div>
        <div>
          <Checkbox id="rememberMe" />
          <Label htmlFor="rememberMe">Lembrar de mim.</Label>
        </div>

        <div>
          <a href="/reset-password">Esqueci minha senha.</a>
        </div>
      </div>
    </div>
  );
};
