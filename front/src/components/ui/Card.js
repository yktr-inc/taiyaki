import React from 'react';

const cardStyle = {
  border: '1px solid grey',
  padding: '10px',
  boxShadow: '5px 5px 5px 0 rgba(0,0,0,0.4)'
};

const Card = ({ children }) => {
  return <div style={cardStyle}>{children}</div>;
};

export default Card;
