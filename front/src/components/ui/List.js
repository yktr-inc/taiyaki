import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const StyledItem = styled.div`
  word-wrap: break-word;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${StyledItem} {
    max-width: 20%;
    margin: 20px;
  }
`;

const List = ({ items, itemComponent = Item }) => {
  const ItemName = itemComponent;
  return (
    <StyledList>
      {items.map(item => (
        <StyledItem key={item._id}><ItemName item={item} /></StyledItem>
      ))}
    </StyledList>
  );
};

export default List;
