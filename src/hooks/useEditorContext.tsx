import { ReactNode, createContext, useContext } from 'react';
import useTemplate, { UseTemplateResult } from './useTemplate';


const EditorContext = createContext<UseTemplateResult | null>(null);

type Props = {
  children: ReactNode;
}

export function EditorProvider({ children }: Props) {
  const templateData = useTemplate();

  return (
    <EditorContext.Provider value={templateData}>
      {children}
    </EditorContext.Provider>
  )
}

export default function useEditorContext() {
  return useContext(EditorContext) as UseTemplateResult;
}