import React  from 'react';
import repository from '../../store/repository';
import { useStateValue } from '../../store/state';
import { debounce } from 'lodash';

const Input = () => {
  const [{ draft }, dispatch] = useStateValue();

  const handleChange = debounce(function (val) {
    const savedDraft = {
      ...draft,
      content: val
    };

    if (savedDraft._id) {
      repository.patch(`/notes/${savedDraft._id}`, savedDraft)
        .then(res => {
          if (res.status === 200) {
            dispatch({
              type: 'setNote',
              note: res.data
            })
          }
        });
    } else {
      repository.post('/notes', savedDraft)
        .then(res => {
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
    <>
      <textarea
        cols="30"
        rows="10"
        placeholder="Qu'est ce qui te passe par la tête mon ptit pote ?"
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};

export default Input;
