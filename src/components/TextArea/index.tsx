import { useEffect, useRef } from 'react';
import s from './styles.module.css';

type Props = {
  value?: string;
  onChange: (value: string) => void;
}

export default function TextArea({
  value,
  onChange,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  }

  return (
    <textarea
      ref={textAreaRef}
      className={s.input}
      value={value?? ''}
      onChange={handleChange}
    />
  )
}