import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <p
      onClick={() => {
        setCounter(counter + 1);
      }}
    >
      {counter} ah ah ah
    </p>
  );
};

export default Counter;
