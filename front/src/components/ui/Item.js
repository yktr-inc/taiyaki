import React, { useState } from 'react';
import { FiTrash, FiUserPlus, FiTag, FiPenTool } from 'react-icons/fi'
import Editor from '../ui/Editor';
import Collaborators from '../ui/Collaborators';
import Card from './Card';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';
import { Button, Popover } from 'element-react';
import styled from 'styled-components';

const Item = ({ item, style }) => {
  const [, dispatch] = useStateValue();
  const [form, setForm] = useState(false);

  const ButtonRow = styled.div`
    opacity: 0;
    transition: 200ms opacity;
    position: absolute;
    bottom: 20px;
  `;

  const StyledCard = styled.div`
    height: 200px;
    overflow: hidden;
    :hover {
      ${ButtonRow} {
        opacity: 1;
      }
    }
  `;

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

    const changeColor = () => {
      alert('clicked');
    }

    const changeCategory = () => {

    }

    const cardBottom = <>
      <FiTrash onClick={deleteNote} />
      <FiUserPlus onClick={() => setForm(!form)} />
    </>;

    return (
      <>
        <StyledCard>
          <Editor readOnly={true} value={item.content} onClick={handleEditMode} />
          <ButtonRow>
            <Button onClick={deleteNote}><FiTrash /></Button>
            <Button onClick={changeCategory}><FiTag /></Button>
            <Button onClick={changeColor}><FiPenTool /></Button>
            {form && <Collaborators noteId={item._id} />}
          </ButtonRow>
        </StyledCard>
      </>
    );
  }, [dispatch, item, style, form]);
};

export default Item;
