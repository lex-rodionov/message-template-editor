import { useState } from 'react';

function App() {
  const [showMessageEditor, setShowMessageEditor] = useState(false);

  const handleShowMessageEditor = () => {
    setShowMessageEditor(true);
  }

  return (
    <div>
      {showMessageEditor ? (
        <div>Message Editor</div>
      ) : (
        <button onClick={handleShowMessageEditor}>
          Message Editor
        </button>
      )}
    </div>
  );
}

export default App;
