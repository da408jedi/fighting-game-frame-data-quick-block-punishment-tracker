import React, { useState } from "react";

const ReactComponent = (props) => {
  const { title, description } = props.data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ReactComponent;
