import { ConditionBranch } from 'types';
import TextArea from 'components/TextArea';
import EditorTemplateCondition from './index';
import s from './styles.module.css';

type Props = {
  label: string;
  condition: ConditionBranch;
  onStartTextChange: (value: string) => void;
  onEndTextChange: (value: string) => void;
}

export default function ConditionItem({
  label,
  condition,
  onStartTextChange,
  onEndTextChange,
}: Props) {
  const { startText, endText, condition: innerCondition } = condition;

  return (
    <div className={s.conditionContainer}>
        <div className={s.conditionLabelContainer}>
          <div className={s.conditionLabel}>{label.toUpperCase()}</div>
        </div>

        <div className={s.inputWrapper}>
          <TextArea value={startText} onChange={onStartTextChange} />
          
          {innerCondition && (
            <>
              <div className={s.innerConditionContainer}>
                <EditorTemplateCondition condition={innerCondition} />
              </div>

              <TextArea value={endText} onChange={onEndTextChange} />
            </>
          )}
        </div>
      </div>
  )
}