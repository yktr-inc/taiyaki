import React from 'react';
import Item from './Item';
import { Layout } from 'element-react';

const cardStyle = {
  cursor: "pointer",
};

const List = ({ items, categories,  itemComponent = Item }) => {
  const ItemName = itemComponent;
  return (
    <div>
      <Layout.Row gutter="20">
      {items.map(item => (
        <Layout.Col key={item._id} span="4">
          <ItemName categories={categories} item={item} key={item._id} />
        </Layout.Col>
      ))}
      {
        items.length <= 0
        &&
        <Layout.Col style={{textAlign: "center"}}>
          <h3> No notes.  </h3>
          <h5> Click "Add a new note" </h5>
        </Layout.Col>
      }
      </Layout.Row>
    </div>
  );
};

export default List;
