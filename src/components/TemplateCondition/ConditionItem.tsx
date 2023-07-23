import { useMemo } from 'react';
import TextArea from 'components/TextArea';
import useEditorContext from 'hooks/useEditorContext';
import { TemplateItemType } from 'types';
import EditorTemplateCondition from './index';
import s from './styles.module.css';


type Props = {
  label: string;
  conditionId: string;
}

export default function ConditionItem({
  label,
  conditionId,
}: Props) {
  const {
    changeConditionText,
    changeConditionEndText,
    getConditionItem,
    setFocus,
  } = useEditorContext();

  const conditionItem = useMemo(
    () => getConditionItem(conditionId),
    [conditionId, getConditionItem],
  );
  if (!conditionItem) return null;

  const handleChangeStartText = (value: string) => {
    changeConditionText(conditionId, value);
  }
  const handleChangeEndText = (value: string) => {
    changeConditionEndText(conditionId, value);
  }
  const handleSetFocus = (input: HTMLTextAreaElement) => {
    setFocus({
      element: input,
      conditionItemId: conditionId,
    });
  }

  return (
    <div className={s.conditionContainer}>
      <div className={s.conditionLabelContainer}>
        <div className={s.conditionLabel}>{label.toUpperCase()}</div>
      </div>

      <div className={s.inputWrapper}>
        <TextArea
          value={conditionItem.startText}
          onChange={handleChangeStartText}
          setFocusedElement={handleSetFocus}
          data-type={TemplateItemType.THEN_OR_ELSE}
        />
        
        {conditionItem.condition && (
          <>
            <div className={s.innerConditionContainer}>
              <EditorTemplateCondition
                parentId={conditionId}
                condition={conditionItem.condition}
              />
            </div>

            <TextArea
              value={conditionItem.endText}
              onChange={handleChangeEndText}
              setFocusedElement={handleSetFocus}
              data-type={TemplateItemType.END_TEXT}
            />
          </>
        )}
      </div>
    </div>
  )
}