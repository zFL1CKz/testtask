import React, {FC} from 'react'
import '../../app/assets/styles/components.css'

/** Перечесление вариантов кнопки */
export enum ButtonVariant{
  primary = 'primary',
  secondary = 'secondary'
}

/** Интерфейс пропсов кнопки */
interface ButtonProps {
  variant: ButtonVariant
  content: string
  className?: string
  onClick: () => void
}

/** Компонент кнопки */
const Button: FC<ButtonProps> = ({variant, className, content, onClick}) => {
  return (
    <button onClick={onClick} className={`button ${className} ${variant}`}>
      {content}
    </button>
  )
}

export default Button