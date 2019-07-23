import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Notes from './components/views/Notes';
import Login from './components/views/Login';
import Register from './components/views/Register';
import { StateProvider } from './store/state';
import repository from './store/repository';

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
      case 'setSharedNotes':
        return {
          ...state,
          sharedNotes: action.notes
        };
      default:
        return state;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    repository.defaults.headers.common['Authorization'] = null;
    window.location = '/login'
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        {localStorage.getItem('token')
          ? <button onClick={logout}>Logout</button>
          : <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        }

        <Route path="/" exact component={Notes} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </StateProvider>
  );
};

export default App;
