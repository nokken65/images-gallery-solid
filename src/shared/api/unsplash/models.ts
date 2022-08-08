import { Infer } from 'myzod';

import { getAllPhotosSchema, photoSchema } from './schemas';

export type GetAllPhotosParams =
  | Partial<Infer<typeof getAllPhotosSchema>>
  | void;
export type StrictGetAllPhotosParams = Infer<typeof getAllPhotosSchema>;

export type Photo = Infer<typeof photoSchema>;
