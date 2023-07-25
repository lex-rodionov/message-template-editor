import { useEffect, useState } from 'react';
import MessagePreview from 'pages/MessagePreview';
import EditorTemplateCondition from 'components/TemplateCondition';
import VariableList from 'components/VariableList';
import AddConditionButton from 'components/AddConditionButton';
import TextArea from 'components/TextArea';
import CustomButton from 'components/CustomButton';
import useEditorContext from 'hooks/useEditorContext';
import {
  MessageBodyType,
  MessageCondition,
  MessageTemplate,
  MessageText,
  TemplateItemType,
} from 'types';
import s from './styles.module.css';


type Props = {
  arrVarNames: string[];
  template?: MessageTemplate | null;
  callbackSave: (template: MessageTemplate) => Promise<void>;
  closeEditor: () => void;
}

export default function MessageEditor({
  arrVarNames,
  template,
  callbackSave,
  closeEditor,
}: Props) {
  const [showPreview, setShowPreview] = useState(false);

  const {
    template: currentTemplate,
    setTemplate,
    changeBodyText,
    addCondition,
    addVariable,
    setFocus,
  } = useEditorContext();

  useEffect(() => {
    if (template) {
      setTemplate(template);
    }
  }, [template]);

  const handleSaveTemplate = async () => {
    await callbackSave(currentTemplate);
  }
  const handleOpenPreview = () => {
    setShowPreview(true);
  }
  const handleClosePreview = () => {
    setShowPreview(false);
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
        <AddConditionButton onClick={addCondition} />
      </div>

      {currentTemplate.body.map(item => {
        if (item.type === MessageBodyType.TEXT) {
          const handleChange = (value: string) => {
            changeBodyText(item.id, value);
          }
          const handleSetFocus = (input: HTMLTextAreaElement) => {
            setFocus({
              element: input,
              conditionItemId: item.id,
            });
          }

          return (
            <div className={s.inputContainer} key={item.id}>
              <TextArea
                value={(item as MessageText).text}
                onChange={handleChange}
                setFocusedElement={handleSetFocus}
                data-type={TemplateItemType.ROOT}
              />
            </div>
          )
        }

        if (item.type === MessageBodyType.CONDITION) {
          return (
            <EditorTemplateCondition
              key={item.id}
              parentId={item.id}
              condition={(item as MessageCondition).condition}
              isRoot
            />
          );
        }
      })}

      <div className={s.controlButtons}>
        <CustomButton text='Preview' onClick={handleOpenPreview} />
        <div className={s.buttonSpace} />
        <CustomButton text='Save' onClick={handleSaveTemplate} />
        <div className={s.buttonSpace} />
        <CustomButton text='Close' onClick={closeEditor} />
      </div>

      {showPreview && (
        <MessagePreview
          template={currentTemplate}
          arrVarNames={arrVarNames}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}