import { Component, createSignal, For, mergeProps } from 'solid-js';

type GalleryProps = {
  columnsCount: number;
  items: { url: string }[];
};

const Gallery: Component<GalleryProps> = (_props) => {
  const props = mergeProps({ columnsCount: 1, items: [] }, _props);

  const [columns, setColumns] = createSignal([]);

  return (
    <div class='flex gap-4'>
      <For each={}>{(column) => {}}</For>
    </div>
  );
};

export { Gallery };
