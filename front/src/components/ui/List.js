import React from 'react';
import Item from './Item';

const listStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  width: '100%'
};

const itemStyle = {
  marginBottom: '20px',
  maxWidth: '100%',
  wordWrap: 'break-word'
};

const List = ({ items, itemComponent = Item }) => {
  const ItemName = itemComponent;
  return (
    <div style={listStyle}>
      {items.map(item => (
        <ItemName key={item._id} style={itemStyle} item={item} />
      ))}
    </div>
  );
};

export default List;
