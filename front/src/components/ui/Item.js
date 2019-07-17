import React, { useState } from 'react';
import { FiTrash, FiUserPlus } from 'react-icons/fi'
import Editor from '../ui/Editor';
import Collaborators from '../ui/Collaborators';
import Card from './Card';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';

const Item = ({ item, style }) => {
  const [, dispatch] = useStateValue();
  const [form, setForm] = useState(false);

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

    const cardBottom = <>
      <FiTrash onClick={deleteNote} />
      <FiUserPlus onClick={() => setForm(!form)} />
    </>;

    return (
      <div style={style}>
        <div bottom={cardBottom}>
          <Editor readOnly={true} value={item.content} onClick={handleEditMode} />
          {form && <Collaborators noteId={item._id} />}
        </div>
      </div>
    );
  }, [dispatch, item, style, form]);
};

export default Item;
