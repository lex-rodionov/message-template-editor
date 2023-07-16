import s from './styles.module.css';

type Props = {
  onClick: () => void;
}

export default function StartPage({ onClick }: Props) {
  return (
    <div className={s.container}>
      <button onClick={onClick}>Message Editor</button>
    </div>
  );
}