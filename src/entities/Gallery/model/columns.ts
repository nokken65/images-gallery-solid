import { createEvent, createStore, sample } from 'effector';

import { Photo } from '@/shared/api';
import { splitArrayByColumns } from '@/shared/utils';

import { photos } from './photos';

const setCount = createEvent<number>();
const $count = createStore<number>(3).on(setCount, (_, payload) => payload);

const $columns = createStore<Photo[][]>([]);

sample({
  clock: photos.$photosMap,
  source: $count,
  fn: (count, photos) => splitArrayByColumns(photos, count),
  target: $columns,
});

sample({
  clock: setCount,
  source: photos.$photosMap,
  fn: (photos, count) => splitArrayByColumns(photos, count),
  target: $columns,
});

export const columns = {
  setCount,
  $count,
  $columns,
};
