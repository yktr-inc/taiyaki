import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './components/views/Notes';
import Login from './components/views/Login';
import { StateProvider } from './store/state';

const App = () => {
  const initialState = {
    draft: {
      content: ''
    },
    modalOpen: false,
    notes: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'openModal':
        return {
          ...state,
          modalOpen: true
        };
      case 'closeModal':
        return {
          ...state,
          modalOpen: false
        };
      case 'setDraft':
        return {
          ...state,
          draft: action.draft
        };
      case 'addNote':
        return {
          ...state,
          notes: [...state.notes, action.note]
        };
      case 'setNote':
        return {
          ...state,
          notes: state.notes.map(note =>
            action.note._id === note._id ? action.note : note
          )
        };
      case 'deleteNote':
        return {
          ...state,
          notes: state.notes.filter(note => action.id !== note._id)
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
      <Router>
        <Route path="/" exact component={Notes} />
        <Route path="/login" component={Login} />
      </Router>
    </StateProvider>
  );
};

export default App;
