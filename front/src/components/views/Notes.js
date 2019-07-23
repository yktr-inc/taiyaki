import React, { useEffect, useSate } from 'react';
import { Link } from 'react-router-dom';
import Input from '../ui/Input';
import List from '../ui/List';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';
import { Button, Layout, Menu } from 'element-react';
import { BrowserRouter as Router, NavLink, Route, BrowserHistory } from 'react-router-dom';
import queryString from 'query-string';

const containerStyle = {
  width: '80vw',
  margin: 'auto'
};

const marginBlock = {
  marginTop: '50px',
};

const categoriesStyle = {
  minHeight: "92vh",
  a: {
    decoration: "none",
  }
};

const Notes = ({ history }) => {
  const [{ notes, categories, sharedNotes }, dispatch] = useStateValue();

  const createNewNote = () => {
    dispatch({ type: 'resetDraft' });
    dispatch({ type: 'openModal' });
  };

  useEffect(() => {
    repository.get('/notes').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setNotes',
          notes: res.data
        });
      }
    });
    repository.get('/notes/shared').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setSharedNotes',
          notes: res.data
        });
      }
    });
    repository.get('/categories').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setCategories',
          categories: res.data
        });
      }
    });
    history.listen((({ search }) => {
      let parsed = queryString.parse(search);
      parsed = (Object.keys(parsed).length > 0) ? `?cat=${parsed.category}`: '';
      repository.get(`/notes${parsed}`).then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'setNotes',
            notes: res.data
          });
        }
    });
    }));
  }, [dispatch]);

  return (
    <>
    <Layout.Row gutter={20}>
        <Layout.Col span={3}>
          <Menu defaultActive="1" style={categoriesStyle} >
            <NavLink to="/app">
              <Menu.Item index="1"><i className="el-icon-menu"></i>All notes</Menu.Item>
            </NavLink>
            {categories && categories.map((el, index) => (
              <NavLink to={`/app?category=${el.label}`}>
                <Menu.Item index={el.index}>{el.label}</Menu.Item>
              </NavLink>
            ))}
          </Menu>
        </Layout.Col>
        <Layout.Col span={20}>
        <Layout.Row style={marginBlock} type="flex" justify="center">
          <Layout.Col span="2">
            <Button onClick={createNewNote}>Add a new note</Button>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row style={marginBlock} type="flex">
          <div style={containerStyle}>
            <List categories={categories} items={notes} />
            {sharedNotes && <>
              <hr/>
              <List categories={categories} items={sharedNotes} />
            </>}
          </div>
          <Input />
        </Layout.Row>
        </Layout.Col>
      </Layout.Row>
    </>
  );
};

export default Notes;
