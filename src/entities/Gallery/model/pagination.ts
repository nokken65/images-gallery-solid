import { createEvent, createStore, sample } from 'effector';

const $page = createStore<number>(1);
const $hasPrev = createStore<boolean>(false);
const $hasNext = createStore<boolean>(false);
const $total = createStore<number | null>(null);
const $perPage = createStore<number>(20);

const prev = createEvent<void>();
const next = createEvent<void>();

const prevGuarded = sample({
  clock: prev,
  source: $page,
  filter: (page) => page > 1,
  fn: (page) => page - 1,
});

const nextGuarded = sample({
  clock: next,
  source: { page: $page, total: $total },
  filter: ({ page, total }) => page < (total ?? 0),
  fn: ({ page }) => page + 1,
});

$page.on([prevGuarded, nextGuarded], (_, payload) => payload);

sample({
  clock: $page,
  fn: (page) => page > 1,
  target: $hasPrev,
});

sample({
  clock: [$page, $total],
  source: { page: $page, total: $total, perPage: $perPage },
  fn: ({ page, total, perPage }) => page < (total ?? 0) / perPage,
  target: $hasNext,
});

export const pagination = {
  prev,
  next,
  $page,
  $hasPrev,
  $hasNext,
  $total,
  $perPage,
};
