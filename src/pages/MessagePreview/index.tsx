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
  console.log({arrVarNames, template});
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        Template Preview
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}