import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Switch } from "@headlessui/react";

export default function SettingsPage() {
  return (
    <div className="w-full m-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">Configurações</h1>

        <form className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Nome de usuário
            </label>
            <Input
              id="username"
              type="text"
              className="mt-2 w-full px-4 py-2 border rounded-md text-gray-700"
              placeholder="Digite seu nome de usuário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Endereço de e-mail
            </label>
            <Input
              id="email"
              type="email"
              className="mt-2 w-full px-4 py-2 border rounded-md text-gray-700"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Nova senha
            </label>
            <Input
              id="password"
              type="password"
              className="mt-2 w-full px-4 py-2 border rounded-md text-gray-700"
              placeholder="Digite uma nova senha"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="notifications">
              Notificações
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">Ativar</Button>
              <Button className="bg-gray-500 text-white px-4 py-2 rounded">Desativar</Button>
            </div>
          </div>

          <div className="group flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-orange-400 transition duration-300 ease-in-out">
            <Switch className="group relative flex h-5 w-12 cursor-pointer rounded-full bg-white border border-gray-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10">
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-gray-500 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              />
            </Switch>
            <span className="text-gray-500">Modo Escuro/Claro</span>
          </div>

          <div>
            <Button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">
              Salvar alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}