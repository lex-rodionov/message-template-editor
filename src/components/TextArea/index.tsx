import { useEffect, useRef } from 'react';
import { TYPE_ATTRIBUTE_NAME } from 'constants/index';
import s from './styles.module.css';


type Props = {
  value?: string;
  onChange: (value: string) => void;
  setFocusedElement?: (value: HTMLTextAreaElement) => void;
  [TYPE_ATTRIBUTE_NAME]: string;
}

export default function TextArea({
  value,
  onChange,
  setFocusedElement,
  ...props
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

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (setFocusedElement) {
      setFocusedElement(event.target);
    }
  }

  return (
    <textarea
      ref={textAreaRef}
      className={s.input}
      value={value ?? ''}
      onChange={handleChange}
      onFocus={onFocus}
      {...props}
    />
  )
}