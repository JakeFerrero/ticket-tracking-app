import styles from './buttons.module.css';

/**
 * css class of button, dictating style
 */
export const ButtonClass = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ALERT: 'alert'
} as const;
type ButtonClass = (typeof ButtonClass)[keyof typeof ButtonClass];

/**
 * Type of button in context of a <form> element
 */
export const ButtonType = {
  BUTTON: 'button',
  SUBMIT: 'submit'
} as const;
type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

interface Props {
  buttonClass: ButtonClass;
  text: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (e?: any) => void;
}

export function Button({ onClick, buttonClass, text, type = ButtonType.BUTTON, disabled = false }: Props) {
  return (
    <button className={`${styles.button} ${styles[buttonClass]}`} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
