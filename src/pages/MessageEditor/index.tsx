import EditorTemplateCondition from 'components/TemplateCondition';
import VariableList from 'components/VariableList';
import AddConditionButton from 'components/AddConditionButton';
import TextArea from 'components/TextArea';
import CustomButton from 'components/CustomButton';
import useEditorContext from 'hooks/useEditorContext';
import { ROOT_PARENT_ID } from 'constants/index';
import { TemplateCondition, TemplateItemType } from 'types';
import s from './styles.module.css';

// TODO: Replace this type
type MessageTemplate1 = {
  header?: string;
  body: TemplateCondition;
  footer?: string;
}

type Props = {
  arrVarNames: string[];
  tempt?: MessageTemplate1;
  callbackSave: (template: string) => Promise<void>;
}

export default function MessageEditor({
  arrVarNames,
  tempt,
  callbackSave,
}: Props) {
  const {
    template,
    changeHeader,
    changeFooter,
    addCondition,
    addVariable,
    setFocus,
  } = useEditorContext();

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
    console.log(template);
    await callbackSave('');
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
          value={template.header}
          onChange={changeHeader}
          setFocusedElement={handleSetFocus}
          data-type={TemplateItemType.HEADER}
        />
      </div>

      {!!template.body && (
        <EditorTemplateCondition
          parentId={ROOT_PARENT_ID}
          condition={template.body}
        />
      )}

      <div className={s.inputContainer}>
        <TextArea
          value={template.footer}
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