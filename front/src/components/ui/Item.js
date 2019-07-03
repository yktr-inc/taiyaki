import React from 'react';
import Editor from '../ui/Editor';
import Card from './Card';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';

const Item = ({ item, style }) => {
  const [, dispatch] = useStateValue();

  return React.useMemo(() => {
    const handleEditMode = () => {
      dispatch({
        type: 'setDraft',
        draft: item
      });
      dispatch({ type: 'openModal' });
    };

    const deleteNote = () => {
      repository.delete(`/notes/${item._id}`).then(res => {
        if (res.status === 204) {
          dispatch({
            type: 'deleteNote',
            id: item._id
          });
        }
      });
    };

    return (
      <div style={style}>
        <Card>
          <button onClick={handleEditMode}>Edit</button>
          <button onClick={deleteNote}>Delete</button>
          <Editor readOnly={true} value={item.content} />
        </Card>
      </div>
    );
  }, [dispatch, item, style]);
};

export default Item;
