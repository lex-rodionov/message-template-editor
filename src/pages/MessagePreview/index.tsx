import CustomButton from 'components/CustomButton';
import TextArea from 'components/TextArea';
import TextInput from 'components/TextInput';
import { generateMessage } from 'utils/messageGenerator';
import useVariables from 'hooks/useVariables';
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
  const { variables, updateVariable } = useVariables(arrVarNames);

  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.centerContainer}>
          <h2>Message Preview</h2>
        </div>

        <TextArea
          value={generateMessage(template, variables)}
          disabled
        />

        <div className={s.inputList}>
          <p className={s.inputListTitle}>Variables :</p>
          {Object.entries(variables).map(([label, value]) => {
            const handleChange = (newValue: string) => {
              updateVariable(label, newValue);
            }

            return (
              <div key={label} className={s.inputWrapper}>
                <TextInput
                  label={label}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>
        
        <div className={s.centerContainer}>
          <CustomButton text='Close' onClick={onClose} />
        </div>
      </div>
    </div>
  )
}