import React, { useEffect } from 'react';
import Input from '../ui/Input';
import List from '../ui/List';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';

const containerStyle = {
  width: '80vw',
  margin: 'auto'
};

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
      <button onClick={createNewNote}>Create new note</button>
      <div style={containerStyle}>
        <List items={notes} />
        {sharedNotes && <>
          <hr/>
          <List items={sharedNotes} />
        </>}
      </div>
      <Input />
    </>
  );
};

export default Notes;
