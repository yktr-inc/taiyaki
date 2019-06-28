import React, { useState } from 'react';
import Card from './Card';
import { useStateValue } from "../../store/state";
import Input from "./Input";

const Item = ({ item, style }) => {
  const [edit, setEdit] = useState(false);
  const [, dispatch] = useStateValue();

  const handleEditMode = () => {
    dispatch({
      type: 'setDraft',
      draft: item
    });
    setEdit(true)
  };

  return (
    <div style={style}>
      {!edit &&
        <Card>
          <button onClick={handleEditMode}>Edit</button>
          {item.content}
        </Card>
      }
      {edit && <Input />}
    </div>
  )
};

export default Item;
