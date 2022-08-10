import { useUnit } from 'effector-solid';

import { pagination } from '../model';

export const PagesProgress = () => {
  const [page, total] = useUnit([pagination.$page, pagination.$total]);

  return (
    <div class='fixed right-0 top-0 h-screen'>
      <div
        class='w-4 bg-purple-600'
        style={{ height: `${(page() * 100) / (total() ?? 1)}vh` }}
      />
      <span class='m-4 text-xl font-bold'>{page()}</span>
    </div>
  );
};
