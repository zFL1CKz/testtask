import React, { FC } from 'react';
import classes from './Button.module.scss';

/** Перечесление вариантов кнопки */
export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

/** Интерфейс пропсов кнопки */
interface ButtonProps {
  variant: ButtonVariant;
  content: string;
  className?: string;
  onClick: () => void;
}

/** Компонент кнопки */
const Button: FC<ButtonProps> = ({ variant, className, content, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.button} ${
        variant === 'primary' ? classes.primary : classes.secondary
      } ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
