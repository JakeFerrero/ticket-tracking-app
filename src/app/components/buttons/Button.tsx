import styles from './buttons.module.css';

export const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ALERT: 'alert',
} as const;
type ButtonType = typeof ButtonType[keyof typeof ButtonType];

interface Props {
  onClick: () => void;
  type: ButtonType;
  text: string;
  disabled?: boolean;
}

export function Button({ onClick, type, text, disabled }: Props) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
