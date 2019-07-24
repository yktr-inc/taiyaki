import React from 'react';
import { Menu } from 'element-react';
import { NavLink } from 'react-router-dom';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';

const favicon = {
  width: '40px',
};

const AppMenu = () => {
  const [{ token }] = useStateValue();

  const logout = () => {
    localStorage.removeItem('token');
    repository.defaults.headers.common['Authorization'] = null;
    window.location = '/login'
  };

  return (
    <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
      <NavLink to="/app">
        <Menu.Item index="1">
          <img style={favicon} src="favicon.png"/>
          Taiyaki
        </Menu.Item>
      </NavLink>
      {(localStorage.getItem('token') || token)
        ? <React.Fragment>
          <Menu.Item index="2"><a onClick={logout}>Logout</a></Menu.Item>
          <NavLink to="/categories">
            <Menu.Item index="2">Categories</Menu.Item>
          </NavLink>
        </React.Fragment>
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
  )
};

export default AppMenu;
