export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface RequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
}

const fetcher = async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
  const url = `${import.meta.env.VITE_BASE_HOST}${endpoint}`;

  const response = await fetch(
    url,
    options && {
      ...options,
      ...(options?.body && { body: JSON.stringify(options.body) }),
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};

export default fetcher;
