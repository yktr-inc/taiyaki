import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Notes from './components/views/Notes';
import Login from './components/views/Login';
import Register from './components/views/Register';
import { StateProvider } from './store/state';
import repository from './store/repository';
import { Menu } from 'element-react';
import 'element-theme-default';

const App = () => {
  const initialState = {
    draft: {
      content: ''
    },
    modalOpen: false,
    notes: []
  };

  const favicon = {
    width: '40px',
  }

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
      <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
        <NavLink to="/">
          <Menu.Item index="1">
            <img style={favicon} src="favicon.png"/>
            Taiyaki
          </Menu.Item>
        </NavLink>
        {localStorage.getItem('token')
          ? <Menu.Item index="2"><a onClick={logout}>Logout</a></Menu.Item>
          : <>
            <NavLink to="/login">
              <Menu.Item index="2">Login</Menu.Item>
            </NavLink>
            <NavLink to="/register">
              <Menu.Item index="3">Register</Menu.Item>
            </NavLink>
          </>
        }
      </Menu>
        <Route path="/" exact component={Notes} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </StateProvider>
  );
};

export default App;
