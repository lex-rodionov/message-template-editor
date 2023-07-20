import { useMemo } from 'react';
import useEditorContext from 'hooks/useEditorContext';
import TextArea from 'components/TextArea';
import { TemplateCondition, TemplateItemType } from 'types';
import ConditionItem from './ConditionItem';
import s from './styles.module.css';

type Props = {
  parentId: string;
  condition: TemplateCondition;
}

export default function EditorTemplateCondition({
  parentId,
  condition,
}: Props) {
  const {
    changeConditionText,
    getConditionItem,
    deleteCondition,
    setFocus,
  } = useEditorContext();
  
  const ifText = useMemo(() => {
    const item = getConditionItem(condition.ifId);
    return !!item ? item.startText : '';
  }, [condition, getConditionItem]);

  if (!condition) return null;

  const handleChangeIf = (value: string) => {
    changeConditionText(condition.ifId, value);
  }
  const handleSetFocus = (input: HTMLTextAreaElement) => {
    setFocus({
      element: input,
      conditionItemId: condition.ifId,
    });
  };
  const handleDeleteCondition = () => {
    deleteCondition(parentId);
  }

  return (
    <div className={s.container}>
      <div className={s.conditionContainer}>
        <div className={s.conditionLabelContainer}>
          <div className={s.conditionLabel}>IF</div>
          <div
            className={s.deleteButton}
            onClick={handleDeleteCondition}
          >Delete</div>
        </div>

        <div className={s.inputWrapper}>
          <TextArea
            value={ifText}
            onChange={handleChangeIf}
            setFocusedElement={handleSetFocus}
            data-type={TemplateItemType.IF}
          />
        </div>
      </div>

      <ConditionItem
        label='then'
        conditionId={condition.thenId}
      />

      <ConditionItem
        label='else'
        conditionId={condition.elseId}
      />
    </div>
  );
}