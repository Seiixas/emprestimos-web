import axios from "axios";
import { useEffect, useState } from "react";

function handleAxiosError(err: unknown) {
  const isAxiosError = err instanceof AxiosError;

  if (isAxiosError) {
    if (err.response) {
      if (err.response?.status === 500)
        return "Oops! Algo de errado aconteceu :(";

      return err.response.data.message;
    }
  }

  return "Oops! Algo de inesperado aconteceu :(";
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type useFetchProps = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  manual?: boolean;
  params?: any;
  accessToken?: string;
  headers?: any;
};

type requestProps<T> = {
  body?: T;
};

export function useFetch<Request = any, Response = any>(
  url: string,
  { method, params, accessToken, headers, manual = false }: useFetchProps,
  depsArray: any[] = []
) {
  const [data, setData] = useState<Response | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  async function fetch(
    { body }: requestProps<Request> = {} as requestProps<Request>
  ) {
    setIsFetching(true);
    try {
      const response = await api.request<Response>({
        url,
        method,
        ...(params && { params }),
        ...(headers && { headers }),
        ...(accessToken && {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        ...(body && { data: body }),
      });
      setData(response.data);
      return response.data;
    } catch (error) {
      console.log("error => ", JSON.stringify(error, null, 2));
      setError(handleAxiosError(error));
      throw error;
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (!manual) fetch();
  }, depsArray);

  return [{ data, isFetching, error }, fetch] as const;
}
