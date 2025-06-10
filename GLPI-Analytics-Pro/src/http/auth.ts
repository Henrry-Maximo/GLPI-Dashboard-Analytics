import { PropsAuthRequest, PropsAuthResponse } from "@/@types/interface-login";

export const Login = async ({
  username,
  password,
}: PropsAuthRequest): Promise<PropsAuthResponse> => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/api/sessions`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    // if (!response.ok) throw new Error("Please, verify status API.");

    const { token } = await response.json();
    return { token };
  } catch (err) {
    console.error(err);
    throw new Error('Erro no fetch login.');
  }
};
