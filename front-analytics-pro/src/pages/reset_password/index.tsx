import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const ResetPassword = () => {
  return (
    <>
      <h1>Template Reset Password</h1>

      <div>
        <form>
          <Label>Nome de Usuário</Label>
          <Input type="text" />

          <Separator />

          <Button>Enviar.</Button>
        </form>
      </div>
    </>
  );
};
