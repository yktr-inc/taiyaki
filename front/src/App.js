import React from 'react';
import Notes from './components/Notes';
import { StateProvider } from './store/state';

const App = () => {
  const initialState = {
    draft: {
      content: ''
    },
    notes: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setDraft':
        return {
          ...state,
          draft: action.draft
        };
      case 'addNote':
        return {
          ...state,
          notes: [
            ...state.notes,
            action.note
          ]
        };
      case 'setNote':
        return {
          ...state,
          notes: state.notes.map(note => action.note._id === note._id ? action.note : note)
        };
      case 'setNotes':
        return {
          ...state,
          notes: action.notes
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Notes />
    </StateProvider>
  );
};

export default App;
