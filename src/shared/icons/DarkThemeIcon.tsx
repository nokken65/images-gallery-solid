import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

type DarkThemeIconProps = JSX.SvgSVGAttributes<SVGElement>;

export const DarkThemeIcon: Component<DarkThemeIconProps> = (props) => {
  const [, rest] = splitProps(props, []);

  return (
    <svg
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      {...rest}
    >
      <path d='M257.05,490.667c-129.975,0-235.717-105.742-235.717-235.717A235.752,235.752,0,0,1,224.083,21.54,21.333,21.333,0,0,1,241.447,58.4,150.577,150.577,0,0,0,192.63,169.2C192.63,252,260,319.37,342.8,319.37A150.577,150.577,0,0,0,453.6,270.553a21.333,21.333,0,0,1,36.862,17.364,235.752,235.752,0,0,1-233.41,202.75ZM170.7,82.33C107.089,114.377,64,180.578,64,254.95,64,361.4,150.6,448,257.05,448c74.372,0,140.573-43.089,172.62-106.7A192.964,192.964,0,0,1,342.8,362.036c-106.332,0-192.841-86.508-192.841-192.841A192.964,192.964,0,0,1,170.7,82.33Z' />
    </svg>
  );
};
