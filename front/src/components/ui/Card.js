import React from 'react';
import styled from 'styled-components';

const StyledCardOverlay = styled.div`
  opacity: 0;
  transition: 200ms opacity;
`;

const StyledCard = styled.div`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 10px;
  transition: 200ms box-shadow;
  :hover {
    border-color: transparent;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.4);
    
    ${StyledCardOverlay} {
      opacity: 1;
    }
  }
`;

const Card = ({ children, bottom }) => {
  return (
    <StyledCard>
      {children}
      <StyledCardOverlay>
        {bottom}
      </StyledCardOverlay>
    </StyledCard>
  );
};

export default Card;
