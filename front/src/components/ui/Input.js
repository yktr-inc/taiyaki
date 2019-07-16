import React from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { debounce } from 'lodash';
import Editor from './Editor';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';

Modal.setAppElement('#root');

const Input = () => {
  const [{ draft, modalOpen }, dispatch] = useStateValue();

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

  return (
    <Modal isOpen={modalOpen}>
      <FiX onClick={() => dispatch({ type: 'closeModal' })} />
      <Editor value={draft.content} onChange={handleChange} />
    </Modal>
  );
};

export default Input;
