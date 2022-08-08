import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { decode } from 'blurhash';
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onMount,
  Show,
  splitProps,
} from 'solid-js';

type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  blurHash?: string;
  width: number;
  height: number;
};

export const PImage: Component<ImageProps> = (_props) => {
  const props = mergeProps(
    {
      blurHash: 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
      src: '',
      alt: '',
      width: 320,
      height: 320,
    },
    _props,
  );
  const [local, rest] = splitProps(props, [
    'blurHash',
    'src',
    'alt',
    'width',
    'height',
  ]);

  const [src, setSrc] = createSignal<string | null>(null);

  let wrapperRef: HTMLDivElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;

  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.2 });
  const visible = useVisibilityObserver(() => wrapperRef);

  onMount(() => {
    if (canvasRef) {
      const width = 16;
      const height = Math.round((width * local.height) / local.width);

      canvasRef.width = width;
      canvasRef.height = height;

      const ctx = canvasRef.getContext('2d');

      if (ctx) {
        const pixels = decode(local.blurHash, width, height);
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  });

  createEffect(() => {
    if (visible()) {
      const img = new Image();
      img.src = local.src;
      img.onload = () => {
        setSrc(local.src);
      };
    }
  });

  return (
    <div ref={wrapperRef}>
      <Show
        when={src()}
        fallback={<canvas class='h-auto w-full' ref={canvasRef} />}
      >
        {(src) => (
          <img class='h-auto w-full' {...rest} src={src} alt={local.alt} />
        )}
      </Show>
    </div>
  );
};
