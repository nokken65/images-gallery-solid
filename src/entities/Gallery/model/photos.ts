import { createEffect, createStore, sample } from 'effector';
import { produce } from 'immer';

import {
  GetPhotosParams,
  GetPhotosResult,
  Photo,
  unsplashApi,
} from '@/shared/api';

import { pagination } from './pagination';

const getPhotosFx = createEffect<GetPhotosParams, GetPhotosResult>(
  async (params) => await unsplashApi.getPhotos(params),
);

const $photosMap = createStore<Photo[]>([]).on(
  getPhotosFx.doneData,
  (state, payload) => [...state, ...payload.data],
);

// load next page
sample({
  clock: pagination.next,
  source: {
    page: pagination.$page,
    perPage: pagination.$perPage,
    hasNext: pagination.$hasNext,
  },
  filter: ({ hasNext, page }) => hasNext,
  fn: ({ page, perPage }) => ({ page: page, per_page: perPage }),
  target: getPhotosFx,
});

// pagination
sample({
  clock: getPhotosFx.doneData,
  source: pagination.$total,
  filter: (total) => total === null,
  fn: (_, { meta }) => meta.total,
  target: pagination.$total,
});

$photosMap.watch(console.log);
// getPhotosFx.fail.watch(console.log);

export const photos = {
  $photosMap,
  getPhotosFx,
};
