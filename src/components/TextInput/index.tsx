import { useMemo, useState } from 'react';
import s from './styles.module.css';


type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({
  label,
  value,
  onChange,
  ...props
}: Props) {
  const [hasFocus, setHasFocus] = useState(false);

  const containerClassnames = useMemo(
    () => hasFocus ? `${s.container} ${s.activeContainer}` : s.container,
    [hasFocus],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }
  const handleFocus = () => {
    setHasFocus(true);
  }
  const handleBlur = () => {
    setHasFocus(false);
  }

  return (
    <div className={containerClassnames}>
      <label
        className={s.label}
        htmlFor={label}
      >
        {label}
      </label>

      <input
        id={label}
        className={s.input}
        value={value ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  )
}