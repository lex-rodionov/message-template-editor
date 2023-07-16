import { TemplateCondition } from 'types';
import TextArea from 'components/TextArea';
import ConditionItem from './ConditionItem';
import s from './styles.module.css';

type Props = {
  condition: TemplateCondition;
}

export default function EditorTemplateCondition({ condition }: Props) {
  return (
    <div className={s.container}>
      <div className={s.conditionContainer}>
        <div className={s.conditionLabelContainer}>
          <div className={s.conditionLabel}>IF</div>
          <div className={s.deleteButton}>Delete</div>
        </div>

        <div className={s.inputWrapper}>
          <TextArea value={condition.if} onChange={() => null} />
        </div>
      </div>

      <ConditionItem
        label='then'
        condition={condition.then}
        onStartTextChange={() => null}
        onEndTextChange={() => null}
      />

      <ConditionItem
        label='else'
        condition={condition.else}
        onStartTextChange={() => null}
        onEndTextChange={() => null}
      />
    </div>
  );
}