import React from 'react';
import Modal from 'react-modal';
import { FiX, FiTag, FiPenTool } from 'react-icons/fi';
import { debounce } from 'lodash';
import Editor from './Editor';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';
import { Message, Layout, Button, ColorPicker, Select } from 'element-react';

Modal.setAppElement('#root');

const Input = () => {

  const [{ draft, modalOpen }, dispatch] = useStateValue();

  const modalStyle = {
    content : {
      backgroundColor: draft.color,
    }
  };

  const modalButton = {
    cursor: 'pointer',
  };

  const handleChange = debounce(function(value) {
    const savedDraft = {
      ...draft,
      content: value
    };

    if (savedDraft._id) {
      repository.patch(`/notes/${savedDraft._id}`, savedDraft).then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'setNote',
            note: res.data,
          });
        }
      });
    } else {
      repository.post('/notes', savedDraft).then(res => {
        if (res.status === 201) {
          dispatch({
            type: 'setDraft',
            draft: res.data
          });
          dispatch({
            type: 'addNote',
            note: res.data
          });
        }
      });
    }
  }, 500);

  const closeModal = () =>  {
    dispatch({
      type: 'closeModal'
    });
    Message({
      message: 'The note has been successfully saved.',
      type: 'success'
    });
  }

  const changeColor = (color) => {
    draft.color = color;
    handleChange(draft.content);
  };

  const changeCategory = () => {
    alert("category");
  };

  return (
    <Modal style={modalStyle} isOpen={modalOpen}>
      <Layout.Row>
        <Layout.Col span="1">
          <FiX style={modalButton} onClick={() => closeModal()} />
        </Layout.Col>
        <Layout.Col span="12">
        <ColorPicker onChange={changeColor} value={draft.color}></ColorPicker>
        </Layout.Col>
      </Layout.Row>
      <Editor value={draft.content} onChange={handleChange} />
    </Modal>
  );
};

export default Input;
