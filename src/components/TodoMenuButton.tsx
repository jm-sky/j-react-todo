import { ComponentProps } from 'react';

type ToDoMenuButtonProps = ComponentProps<'button'> & {
  tooltip?: string
}

export default function Button(props: ToDoMenuButtonProps) {
  return (
    <button onClick={props.onClick} type="button" className="p-0.5 flex items-center text-primary/75 hover:text-primary" data-tooltip={props.tooltip}>
      {props.children}
    </button>
  );
}
