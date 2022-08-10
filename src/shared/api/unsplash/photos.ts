import { ValidationError } from 'myzod';

import { unsplashRequest } from './base';
import { GetPhotosParams, GetPhotosResult, Photo } from './models';
import { getPhotosSchema, photosSchema } from './schemas';

export const getPhotos = async (
  _params: GetPhotosParams,
): Promise<GetPhotosResult> => {
  const params = getPhotosSchema.parse(_params);

  if (params instanceof ValidationError) {
    return Promise.reject(new Error(params.message));
  }

  const res = await unsplashRequest({
    path: '/photos',
    params,
    init: { method: 'GET' },
  });

  if (res.ok) {
    const data = await res.json();

    const result = photosSchema.try(data);

    if (result instanceof ValidationError) {
      return Promise.reject(new Error(result.message));
    } else {
      return Promise.resolve({
        data: result,
        meta: {
          total: parseInt(res.headers.get('x-total') ?? '', 10),
          page: params.page,
          per_page: parseInt(res.headers.get('x-per-page') ?? '', 10),
        },
      });
    }
  } else {
    return Promise.reject(new Error(res.statusText));
  }
};
