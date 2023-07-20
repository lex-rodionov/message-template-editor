import { useState } from 'react';
import MessageEditor from 'pages/MessageEditor';
import StartPage from 'pages/StartPage';
import { EditorProvider } from 'hooks/useEditorContext';

function App() {
  const [showMessageEditor, setShowMessageEditor] = useState(false);

  const handleShowMessageEditor = () => {
    setShowMessageEditor(true);
  }
  const handleSaveTemplate = async (template: string) => {
    console.log(template);
  }

  const arrVarNames = ['firstname', 'lastname', 'company', 'position'];

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

  return (
    <>
      {showMessageEditor ? (
        <EditorProvider>
          <MessageEditor
            // tempt={template}
            arrVarNames={arrVarNames}
            callbackSave={handleSaveTemplate}
          />
        </EditorProvider>
      ) : (
        <StartPage onClick={handleShowMessageEditor} />
      )}
    </>
  );
}

export default App;
