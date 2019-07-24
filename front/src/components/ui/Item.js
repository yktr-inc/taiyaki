import React, { useState } from 'react';
import { FiTrash, FiUserPlus } from 'react-icons/fi'
import Editor from '../ui/Editor';
import Collaborators from '../ui/Collaborators';
import { useStateValue } from '../../store/state';
import repository from '../../store/repository';
import { Button, Card, Message, Tag } from 'element-react';
import styled from 'styled-components';

const Item = ({ item, categories, style }) => {

  const [, dispatch] = useStateValue();
  const [form, setForm] = useState(false);

  const cardStyle = {
    background: item.color,
  }

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

  const tagStyle = {
    position: 'absolute',
    top: "10px",
  }

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
      Message('The note has been successfully deleted.');
    };

    return (
      <>
        <Card bodyStyle={cardStyle}>
        <StyledCard>
          <Editor readOnly={true} value={item.content} onClick={handleEditMode} />
          { item.category && <Tag style={tagStyle}>
            {categories.length > 0 && categories.find(el => el._id === item.category ).label}
          </Tag> }
          <ButtonRow>
            <Button onClick={deleteNote}><FiTrash /></Button>
            <Button onClick={() => setForm(!form)}><FiUserPlus  /></Button>
            {form && <Collaborators noteId={item._id} />}
          </ButtonRow>
        </StyledCard>
        </Card>
      </>
    );
  }, [dispatch, item, style, form, categories]);
};

export default Item;
