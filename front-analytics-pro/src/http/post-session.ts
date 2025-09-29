export type SchemaSessionRequest = {
  username: string;
  password: string;
};

export type SchemaSessionResponse = {
  token: string;
};

export const PostSession = async ({
  username,
  password,
}: SchemaSessionRequest): Promise<SchemaSessionResponse> => {
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
    
    const { token } = await response.json();
    return { token };
  } catch (err) {
    console.error(err);
    throw new Error("Erro no fetch login.");
  }
};
