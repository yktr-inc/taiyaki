import React, {useEffect} from 'react';
import Input from './ui/Input';
import List from './ui/List';
import { useStateValue } from '../store/state';
import repository from '../store/repository';

const containerStyle = {
  width: '80vw',
  margin: 'auto'
};

const Notes = () => {
  const [{ notes }, dispatch] = useStateValue();

  useEffect(() => {
    repository.get('/notes').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setNotes',
          notes: res.data
        })
      }
    })
  }, [dispatch]);

  return (
    <>
      <Input />
      <div style={containerStyle}>
        <List
          items={notes}
        />
      </div>
    </>
  )
};

export default Notes;
