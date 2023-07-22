import { useState } from 'react';
import CustomButton from 'components/CustomButton';
import TextArea from 'components/TextArea';
import TextInput from 'components/TextInput';
import { MessageTemplate } from 'types';
import s from './styles.module.css';


type Props = {
  arrVarNames: string[];
  template: MessageTemplate;
  onClose: () => void;
}

export default function MessagePreview({
  arrVarNames,
  template,
  onClose,
}: Props) {
  const [val, setVal] = useState('');
  console.log({arrVarNames, template});
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.centerContainer}>
          <h2>Message Preview</h2>
        </div>

        <TextArea
          value={'some text'}
          onChange={() => null}
          disabled
        />

        <div className={s.inputList}>
          <p className={s.inputListTitle}>Variables :</p>
          <div className={s.inputWrapper}>
            <TextInput label={'firstname'} value={val} onChange={setVal} />
          </div>
          <div className={s.inputWrapper}>
            <TextInput label={'firstname'} value={val} onChange={setVal} />
          </div>
          <div className={s.inputWrapper}>
            <TextInput label={'firstname'} value={val} onChange={setVal} />
          </div>
          <div className={s.inputWrapper}>
            <TextInput label={'firstname'} value={val} onChange={setVal} />
          </div>
        </div>
        
        
        <div className={s.centerContainer}>
          <CustomButton text='Close' onClick={onClose} />
        </div>
      </div>
    </div>
  )
}