import { Infer } from 'myzod';

import { getPhotosSchema, photoSchema } from './schemas';

export type Photo = Infer<typeof photoSchema>;

export type GetPhotosParams = Partial<Infer<typeof getPhotosSchema>> | void;
export type StrictGetPhotosParams = Infer<typeof getPhotosSchema>;

export type GetPhotosMeta = {
  total: number;
  page: number;
  per_page: number;
};
export type GetPhotosResult = { data: Photo[]; meta: GetPhotosMeta };
