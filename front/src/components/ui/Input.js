import React from 'react';
import Modal from 'react-modal';
import { FiX, FiTag, FiPenTool } from 'react-icons/fi';
import { debounce } from 'lodash';
import Editor from './Editor';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';
import { Message, Layout, Button, ColorPicker, Select } from 'element-react';

Modal.setAppElement('#root');

const colorpickerStyle = {
  position: "absolute",
  top: "-20px",
}

const Input = () => {

  const [{ draft, modalOpen, categories }, dispatch] = useStateValue();

  const [category, setCategory] = React.useState(draft.category);

  const modalStyle = {
    content : {
      backgroundColor: draft.color || '#FFF',
    }
  };

  const modalButton = {
    cursor: 'pointer',
  };

  React.useEffect(() => {
    repository.get('/categories').then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'setCategories',
          categories: res.data
        });
      }
    });
  }, [dispatch]);


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
    if(draft.content.length > 0){
      Message({
        message: 'The note has been successfully saved.',
        type: 'success'
      });
    }
  }

  const changeColor = (color) => {
    draft.color = color;
    handleChange(draft.content);
  };

  const changeCategory = value => {
    draft.category = value;
    handleChange(draft.content);
  };

  const deleteCategory = _ => {
    draft.category = null;
    handleChange(draft.content);
  }

  return (
    <Modal style={modalStyle} isOpen={modalOpen}>
      <Layout.Row>
        <Layout.Col span="1">
          <FiX style={modalButton} onClick={() => closeModal()} />
        </Layout.Col>
        <Layout.Col span="12">
        <ColorPicker style={colorpickerStyle} onChange={changeColor} value={draft.color}></ColorPicker>
        <Select filterable={true} value={draft.category} clearable={true} onClear={deleteCategory} onChange={changeCategory}>
          {categories && categories.map(el => {
              return <Select.Option key={el._id} label={el.label} value={el._id} />
            })}
        </Select>
        </Layout.Col>
      </Layout.Row>
      <Editor value={draft.content} onChange={handleChange} />
    </Modal>
  );
};

export default Input;
