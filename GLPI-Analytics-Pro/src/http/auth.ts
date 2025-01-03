import type { authPropsResponse } from "../@types/interface-monitoring";

interface AuthPropsRequest {
  username: string;
  password: string;
}

export async function login({
  username,
  password,
}: AuthPropsRequest): Promise<authPropsResponse> {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/api-glpi/sessions`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: username,
      password: password,
    }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const { token } = await response.json();

  return { token };
}
