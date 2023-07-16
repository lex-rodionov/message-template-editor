import s from './styles.module.css';

type Props = {
  text: string;
  onClick: () => Promise<void> | void;
}

export default function CustomButton({
  text,
  onClick,
}: Props) {
  return (
    <div className={s.button} onClick={onClick}>
      <div className={s.buttonText}>{text}</div>
    </div>
  )
}