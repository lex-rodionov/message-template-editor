import s from './styles.module.css';

type Props = {
  variables: string[];
  onClick: (variableName: string) => void;
}

export default function VariableList({ variables, onClick }: Props) {
  return (
    <>
      {variables.map((item, index) => {
        const label = `{${item}}`;
        let space = '';
        if (index < variables.length - 1) {
          space += ',';
        }

        const handleClick = () => {
          onClick(item);
        }

        return (
          <div key={item}>
            <span className={s.clickableItem} onClick={handleClick}>
              {label}
            </span>

            {!!space && (
              <span className={s.space}>
                {space}
              </span>
            )}
          </div>
        );
      })}
    </>
  )
}