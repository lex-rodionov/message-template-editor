import s from './styles.module.css';

type Props = {
  onClick: () => void;
}

export default function AddConditionButton({ onClick }: Props) {
  return (
    <button className={s.addButton} onClick={onClick}>
      <b>Click to add: </b>
      <span className={s.condition}>IF</span>
      <span>{` [{some_variables} or expression] `}</span>
      <span className={s.condition}>THEN</span>
      <span>{` [then_value] `}</span>
      <span className={s.condition}>ELSE</span>
      <span>{` [else_value]`}</span>
    </button>
  )
}