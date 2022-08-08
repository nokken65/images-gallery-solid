const BASE_URL = 'https://api.unsplash.com/';
const CLIENT_ID = 'Client-ID kqWBkGvhO9j_Ks0ImoDhRHr8OYKP_l2uRHQedjioH9E';

type UnsplashRequestProps = {
  path: string;
  params?: Record<string, string | number>;
  init?: RequestInit;
};

export const unsplashRequest = ({
  path,
  params,
  init,
}: UnsplashRequestProps): Promise<Response> => {
  const url = new URL(path, BASE_URL);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key].toString());
      }
    });
  }

  return fetch(url.toString(), {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: CLIENT_ID,
    },
  });
};
