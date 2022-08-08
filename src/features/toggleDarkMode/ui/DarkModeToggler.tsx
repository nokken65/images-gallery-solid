import { useUnit } from 'effector-solid';
import { Component } from 'solid-js';

import { DarkThemeIcon, LightThemeIcon } from '@/shared/icons';
import { Button } from '@/shared/ui';

import { events, selectors } from '../model';

export const DarkModeToggler: Component = () => {
  const [isDarkMode, toggleDarkMode] = useUnit([
    selectors.$isDarkMode,
    events.toggleDarkMode,
  ]);

  return (
    <Button class='w-10 h-10' type='ghost' onClick={() => toggleDarkMode()}>
      {isDarkMode() ? (
        <DarkThemeIcon class='h-6 w-6' />
      ) : (
        <LightThemeIcon class='h-6 w-6' />
      )}
    </Button>
  );
};
