import { ValidationError } from 'myzod';

import { unsplashRequest } from './base';
import { GetAllPhotosParams, Photo } from './models';
import { getAllPhotosSchema, photosSchema } from './schemas';

export const getAllPhotos = async (
  _params: GetAllPhotosParams,
): Promise<Photo[]> => {
  const params = getAllPhotosSchema.parse(_params);

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
      return result;
    }
  } else {
    return Promise.reject(new Error(res.statusText));
  }
};
