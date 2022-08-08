import { Button } from '@/shared/ui';

export const GoUp = () => {
  return (
    <Button
      class='fixed w-12 h-12 p-2 right-0 bottom-0 z-50 mr-4 mb-4'
      onClick={() => window.scrollTo({ top: 0 })}
    >
      Up
    </Button>
  );
};
