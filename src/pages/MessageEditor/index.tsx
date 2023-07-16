import { useState } from 'react';
import { TemplateCondition } from 'types';
import EditorTemplateCondition from 'components/TemplateCondition';
import VariableList from 'components/VariableList';
import AddConditionButton from 'components/AddConditionButton';
import TextArea from 'components/TextArea';
import CustomButton from 'components/CustomButton';
import s from './styles.module.css';


type MessageTemplate = {
  header?: string;
  body: TemplateCondition;
  footer?: string;
}

type Props = {
  arrVarNames: string[];
  template?: MessageTemplate;
  callbackSave: (template: string) => Promise<void>;
}

const defaultTemplate: MessageTemplate = {
  header: '',
  body: {
    if: '',
    then: { startText: '' },
    else: { startText: '' }
  },
  footer: '',
}


export default function MessageEditor({
  arrVarNames,
  template,
  callbackSave,
}: Props) {
  const [messageTemplate, setMessageTemplate] = useState(template ?? defaultTemplate);
  const handleChangeHeader = (value: string) => {
    setMessageTemplate((old) => ({
      ...old,
      header: value,
    }));
  }
  const handleChangeFooter = (value: string) => {
    setMessageTemplate((old) => ({
      ...old,
      footer: value,
    }));
  }
  const handleClickVariable = (name: string) => {
    console.log(name);
  }
  const handleClickAddCondition = () => {
    console.log('Click Add Condition');
  }
  const handleSaveTemplate = async () => {
    await callbackSave('');
  }

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <h2>Message Template Editor</h2>
      </div>

      <div className={s.variableListContainer}>
        <VariableList variables={arrVarNames} onClick={handleClickVariable} />
      </div>
      

      <div className={s.conditionButtonContainer}>
        <AddConditionButton onClick={handleClickAddCondition} />
      </div>

      <div className={s.inputContainer}>
        <TextArea
          value={messageTemplate.header}
          onChange={handleChangeHeader}
        />
      </div>

      {!!messageTemplate.body && (
        <EditorTemplateCondition condition={messageTemplate.body} />
      )}

      <div className={s.inputContainer}>
        <TextArea
          value={messageTemplate.footer}
          onChange={handleChangeFooter}
        />
      </div>

      <div className={s.controlButtons}>
        <CustomButton text='Preview' onClick={() => console.log('PREVIEW')} />
        <div className={s.buttonSpace} />
        <CustomButton text='Save' onClick={handleSaveTemplate} />
        <div className={s.buttonSpace} />
        <CustomButton text='Close' onClick={() => console.log('CLOSE')} />
      </div>
    </div>
  );
}