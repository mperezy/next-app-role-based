// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(
  url: string,
  requestInit: Omit<RequestInit, 'body' | 'method'> & {
    method?: 'GET' | 'POST' | 'PATCH';
    body?: object;
  },
) => {
  const response = await fetch(url, {
    ...requestInit,
    cache: 'no-store',
    body: requestInit.body ? JSON.stringify(requestInit.body) : undefined,
  });
  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(jsonResponse.message, { cause: jsonResponse });
  }

  return jsonResponse as T;
};
