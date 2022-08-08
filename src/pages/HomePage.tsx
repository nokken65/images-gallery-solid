import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { useUnit } from 'effector-solid';
import { createEffect, createMemo, For, onMount, Show } from 'solid-js';

import { PImage } from '@/shared/libs/PImage';
import { Button } from '@/shared/ui';

import {
  $columnsCount,
  $columnsImages,
  $page,
  getAllPhotosFx,
  nextPage,
  setColumnsCount,
} from './gallery';

const HomePage = () => {
  const columns = useUnit($columnsImages);
  const count = useUnit($columnsCount);
  const setCount = useUnit(setColumnsCount);
  const page = useUnit($page);
  const next = useUnit(nextPage);

  let lastElementRef: HTMLSpanElement | undefined;

  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.9 });
  const visible = useVisibilityObserver(() => lastElementRef);

  createEffect(() => {
    if (visible()) {
      console.log('visible');

      next();
    }
  });

  const quality = createMemo(() => {
    if (count() < 4) {
      return 'regular';
    }
    if (count() < 8) {
      return 'small';
    }

    return 'thumb';
  });

  onMount(() => getAllPhotosFx());

  return (
    <div class='flex w-full flex-col justify-center gap-6'>
      <div class='flex'>
        <Button onClick={() => setCount(count() - 1)}>- col</Button>
        <Button onClick={() => setCount(count() + 1)}>+ col</Button>
      </div>
      <Show when={columns().length} fallback={<span>Loading...</span>}>
        <div class='flex w-full gap-2'>
          <For each={columns()}>
            {(column, i) => (
              <div class='flex w-full flex-col gap-2'>
                <For each={column}>
                  {(item, j) => (
                    <PImage
                      src={item.urls[quality()]}
                      alt={item.id}
                      width={item.width}
                      height={item.height}
                      blurHash={item.blur_hash}
                    />
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
      </Show>
      <span class='h-3' ref={lastElementRef} />
    </div>
  );
};

export default HomePage;
