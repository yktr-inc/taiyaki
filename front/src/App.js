import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './components/views/Notes';
import Categories from './components/views/Categories';
import Login from './components/views/Login';
import NotFound from './components/views/NotFound';
import Register from './components/views/Register';
import Menu from './components/ui/Menu';
import { StateProvider } from './store/state';
import 'element-theme-default';

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
      case 'resetDraft':
        return {
          ...state,
          draft: {
            content: '',
          }
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
      case 'addCategory':
        return {
          ...state,
          categories: [...state.categories, action.category]
        };
      case 'setCategories':
        return {
          ...state,
          categories: action.categories
        };
      case 'deleteCategory':
        return {
          ...state,
          categories: state.categories.filter(cat => action.id !== cat._id)
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Menu />
        <Route path="/" exact component={NotFound} />
        <Route path="/app" component={Notes} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/categories" component={Categories} />
      </Router>
    </StateProvider>
  );
};

export default App;
