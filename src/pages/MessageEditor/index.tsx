import { useEffect } from 'react';
import EditorTemplateCondition from 'components/TemplateCondition';
import VariableList from 'components/VariableList';
import AddConditionButton from 'components/AddConditionButton';
import TextArea from 'components/TextArea';
import CustomButton from 'components/CustomButton';
import useEditorContext from 'hooks/useEditorContext';
import { ROOT_PARENT_ID } from 'constants/index';
import { MessageTemplate, TemplateItemType } from 'types';
import s from './styles.module.css';


type Props = {
  arrVarNames: string[];
  template?: MessageTemplate | null;
  callbackSave: (template: MessageTemplate) => Promise<void>;
}

export default function MessageEditor({
  arrVarNames,
  template,
  callbackSave,
}: Props) {
  const {
    template: currentTemplate,
    setTemplate,
    changeHeader,
    changeFooter,
    addCondition,
    addVariable,
    setFocus,
  } = useEditorContext();

  useEffect(() => {
    if (template) {
      setTemplate(template);
    }
  }, [template]);

  const handleSetFocus = (input: HTMLTextAreaElement) => {
    setFocus({
      element: input,
      conditionItemId: '',
    });
  }
  const handleClickAddCondition = () => {
    addCondition();
  }
  const handleSaveTemplate = async () => {
    console.log('MessageTemplate');
    console.log(currentTemplate);
    await callbackSave(currentTemplate);
  }

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <h2>Message Template Editor</h2>
      </div>

      <div className={s.variableListContainer}>
        <VariableList variables={arrVarNames} onClick={addVariable} />
      </div>
      

      <div className={s.conditionButtonContainer}>
        <AddConditionButton onClick={handleClickAddCondition} />
      </div>

      <div className={s.inputContainer}>
        <TextArea
          value={currentTemplate.header}
          onChange={changeHeader}
          setFocusedElement={handleSetFocus}
          data-type={TemplateItemType.HEADER}
        />
      </div>

      {!!currentTemplate.body && (
        <EditorTemplateCondition
          parentId={ROOT_PARENT_ID}
          condition={currentTemplate.body}
        />
      )}

      <div className={s.inputContainer}>
        <TextArea
          value={currentTemplate.footer}
          onChange={changeFooter}
          setFocusedElement={handleSetFocus}
          data-type={TemplateItemType.FOOTER}
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