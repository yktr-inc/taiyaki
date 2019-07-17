import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Card, Layout } from 'element-react';

const List = ({ items, itemComponent = Item }) => {
  const ItemName = itemComponent;
  return (
    <div>
      <Layout.Row gutter="20">
      {items.map(item => (
        <Layout.Col key={item._id} span="4">
        <Card key={item._id}>
          <ItemName item={item} />
        </Card>
        </Layout.Col>
      ))}
      </Layout.Row>
    </div>
  );
};

export default List;
