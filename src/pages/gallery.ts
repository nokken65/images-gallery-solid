import { createEffect, createEvent, createStore, sample } from 'effector';

import { GetAllPhotosParams, Photo, unsplashApi } from '@/shared/api';
import { splitArrayByColumns } from '@/shared/utils';

export const getAllPhotosFx = createEffect<GetAllPhotosParams, Photo[]>(
  async (params) => await unsplashApi.getAllPhotos(params),
);

const $images = createStore<Photo[]>([]).on(
  getAllPhotosFx.doneData,
  (state, payload) => [...state, ...payload],
);

const nextPage = createEvent<void>();
const $page = createStore<number>(1).on(nextPage, (state) => state + 1);

const setColumnsCount = createEvent<number>();

const setColumnsCountGuarded = sample({
  clock: setColumnsCount,
  filter: (count) => count > 0,
});

const $columnsCount = createStore<number>(4).on(
  setColumnsCountGuarded,
  (state, payload) => payload ?? state,
);

const $columnsImages = createStore<Photo[][]>([]);

sample({
  clock: $images,
  source: $columnsCount,
  filter: (_, images): images is Photo[] => !!images.length,
  fn: (count, images) => splitArrayByColumns(images, count),
  target: $columnsImages,
});

sample({
  clock: setColumnsCountGuarded,
  source: $images,
  filter: (images): images is Photo[] => !!images.length,
  fn: (images, count) => splitArrayByColumns(images, count),
  target: $columnsImages,
});

sample({
  clock: nextPage,
  source: $page,
  fn: (page) => ({ page }),
  target: getAllPhotosFx,
});

$page.watch(console.log);

$images.watch(console.log);

$columnsImages.watch(console.log);

getAllPhotosFx.fail.watch(console.warn);

export {
  $columnsCount,
  $columnsImages,
  $images,
  $page,
  nextPage,
  setColumnsCount,
};
