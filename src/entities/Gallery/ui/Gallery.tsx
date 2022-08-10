import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { useUnit } from 'effector-solid';
import { Component, createEffect, createMemo, Index, onMount } from 'solid-js';

import { PImage } from '@/shared/libs/PImage';

import { columns, pagination, photos } from '../model';

export const Gallery: Component = () => {
  const cols = useUnit(columns.$columns);
  const next = useUnit(pagination.next);
  const [count, setCount] = useUnit([columns.$count, columns.setCount]);

  let triggerRef: HTMLSpanElement | undefined;
  const isVisible = createVisibilityObserver({
    threshold: 0,
    rootMargin: '100%',
  })(() => triggerRef);

  const quality = createMemo(() => {
    if (count() === 3) {
      return 'regular';
    } else {
      return 'small';
    }
  });

  onMount(() => {
    photos.getPhotosFx();
    if (window.innerWidth < 800) {
      setCount(2);
    } else {
      setCount(3);
    }
  });

  createEffect(() => {
    if (isVisible()) {
      next();
    }
  });

  return (
    <div class='flex w-full flex-col'>
      <div class='flex w-full gap-4 lg:gap-2'>
        <Index each={cols()}>
          {(col) => (
            <div class='flex flex-col gap-4 lg:gap-2'>
              <Index each={col()}>
                {(photo) => (
                  <PImage
                    src={photo().urls[quality()] + '&fm=webp'}
                    alt={photo().id}
                    blurHash={photo().blur_hash}
                    width={photo().width}
                    height={photo().height}
                  />
                )}
              </Index>
            </div>
          )}
        </Index>
      </div>
      <span ref={triggerRef} />
    </div>
  );
};
