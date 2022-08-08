import { clsx } from 'clsx';
import { JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';

type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  type?: 'primary' | 'ghost';
  rounded?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
};

export const Button: ParentComponent<ButtonProps> = (_props) => {
  const props = mergeProps(
    { type: 'primary', rounded: true, htmlType: 'button' },
    _props,
  );
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'type',
    'rounded',
    'htmlType',
  ]);

  const className = () =>
    clsx(
      'btn',
      local.rounded && 'rounded-xl',
      local.type === 'primary' && 'btn-primary',
      local.type === 'ghost' && 'btn-ghost',
      local.class,
    );

  return (
    <button
      class={className()}
      type={local.htmlType !== 'button' ? 'submit' : 'button'}
      {...rest}
    >
      {props.children}
    </button>
  );
};
