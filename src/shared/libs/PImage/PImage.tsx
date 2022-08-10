import { decode } from 'blurhash';
import clsx from 'clsx';
import {
  Component,
  createSignal,
  JSX,
  mergeProps,
  onMount,
  Show,
  splitProps,
} from 'solid-js';

type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  blurHash: string | null;
  width: number;
  height: number;
};

export const PImage: Component<ImageProps> = (_props) => {
  const props = mergeProps(
    {
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

  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (canvasRef) {
      const width = 16;
      const height = Math.round((width * local.height) / local.width);

      canvasRef.width = width;
      canvasRef.height = height;

      const ctx = canvasRef.getContext('2d');

      if (ctx) {
        const pixels = decode(
          local.blurHash ?? 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
          width,
          height,
        );
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
    {
      const img = new Image();
      img.src = local.src;
      img.onload = () => {
        setSrc(local.src);
      };
    }
  });

  return (
    <Show
      when={src()}
      fallback={<canvas class={clsx('h-auto w-full')} ref={canvasRef} />}
    >
      <img
        class={clsx('h-auto w-full')}
        {...rest}
        src={src()!}
        loading='lazy'
        alt={local.alt}
      />
    </Show>
  );
};
