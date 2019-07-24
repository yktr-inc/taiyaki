import React from 'react';
import { Redirect } from "react-router-dom";

const NotFound = () => {

  return (
    <>
      <Redirect to='/app'/>;
    </>
  )
};

export default NotFound;
