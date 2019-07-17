import React, { useEffect } from 'react';
import Input from '../ui/Input';
import List from '../ui/List';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';
import { Button, Layout } from 'element-react';

const containerStyle = {
  width: '80vw',
  margin: 'auto'
};

const marginBlock = {
  marginTop: '50px',
}

const Notes = () => {
  const [{ notes, sharedNotes }, dispatch] = useStateValue();

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
  }, [dispatch]);

  return (
    <>
      <Layout.Row style={marginBlock} type="flex" justify="center">
        <Layout.Col span="2">
          <Button onClick={createNewNote}>Add a new note</Button>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row style={marginBlock} type="flex">
        <div style={containerStyle}>
          <List items={notes} />
          {sharedNotes && <>
            <hr/>
            <List items={sharedNotes} />
          </>}
        </div>
        <Input />
      </Layout.Row>
    </>
  );
};

export default Notes;
