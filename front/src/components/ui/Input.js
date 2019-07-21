import React from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { debounce } from 'lodash';
import Editor from './Editor';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';
import { Message } from 'element-react';

Modal.setAppElement('#root');

const Input = () => {

  const [{ draft, modalOpen }, dispatch] = useStateValue();

  const modalButton = {
    cursor: 'pointer',
  }

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
            note: res.data
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

  return (
    <Modal isOpen={modalOpen}>
      <FiX style={modalButton} onClick={() => closeModal()} />
      <Editor value={draft.content} onChange={handleChange} />
    </Modal>
  );
};

export default Input;
