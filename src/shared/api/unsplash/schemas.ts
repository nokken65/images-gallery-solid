import { array, date, literals, number, object, string } from 'myzod';

import { HEX_COLOR, UNSPLASH_IMAGE_URL } from '@/shared/constants/regex';

export const getPhotosSchema = object({
  page: number().default(1),
  per_page: number().min(0).max(30).default(20),
  order_by: literals('latest', 'oldest', 'popular').default('latest'),
}).default({
  page: 1,
  per_page: 20,
  order_by: 'latest',
});

export const photoSchema = object({
  id: string(),
  created_at: date(),
  updated_at: date(),
  width: number(),
  height: number(),
  color: string().pattern(HEX_COLOR),
  blur_hash: string().nullable(),
  likes: number(),
  description: string().nullable(),
  urls: object({
    raw: string().pattern(UNSPLASH_IMAGE_URL),
    full: string().pattern(UNSPLASH_IMAGE_URL),
    regular: string().pattern(UNSPLASH_IMAGE_URL),
    small: string().pattern(UNSPLASH_IMAGE_URL),
    thumb: string().pattern(UNSPLASH_IMAGE_URL),
  }).allowUnknownKeys(),
}).allowUnknownKeys();

export const photosSchema = array(photoSchema);
