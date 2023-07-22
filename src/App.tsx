import { useEffect, useState } from 'react';
import MessageEditor from 'pages/MessageEditor';
import StartPage from 'pages/StartPage';
import { EditorProvider } from 'hooks/useEditorContext';
import { getMessageTemplate, getVariables, setMessageTemplate } from 'services/storage';
import { MessageTemplate } from 'types';


const template = {
  header: `Hello {firstname}!

I just went through your profile and I would love to join your network!`,
  body: {
    if: '{company}',
    then: {
      startText: 'I know you work at {company}',
      condition: {
        if: '{position}',
        then: { startText: 'as {position}' },
        else: { startText: ', but what is your role?' },
      },
      endText: ':)',
    },
    else: { startText: 'Where do you work at the moment?' }
  },
  footer: `

Jake
Software Developer
jakelennard911@gmail.com`,
}


function App() {
  const [showMessageEditor, setShowMessageEditor] = useState(false);
  const [variables, setVariables] = useState<string[]>([]);
  const [template, setTemplate] = useState<MessageTemplate | null>(null);

  useEffect(() => {
    setVariables(getVariables());
    setTemplate(getMessageTemplate());
  }, []);

  const handleShowMessageEditor = () => {
    setShowMessageEditor(true);
  }
  const handleCloseMessageEditor = () => {
    setShowMessageEditor(false);
  }
  const handleSaveTemplate = async (value: MessageTemplate) => {
    setMessageTemplate(value);
  }

  return (
    <>
      {showMessageEditor ? (
        <EditorProvider>
          <MessageEditor
            template={template}
            arrVarNames={variables}
            callbackSave={handleSaveTemplate}
            closeEditor={handleCloseMessageEditor}
          />
        </EditorProvider>
      ) : (
        <StartPage onClick={handleShowMessageEditor} />
      )}
    </>
  );
}

export default App;
