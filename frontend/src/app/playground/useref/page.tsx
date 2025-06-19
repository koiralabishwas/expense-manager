'use client';
import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
  const [name, setName] = useState('');
  const prevName = useRef<string>("");
  
  useEffect(() => {
    prevName.current = name
  },[name])


  return (
    <div>
      <div>name: {name} ,, previousName : {prevName.current}</div>
      <input
        value={name}
        type="text"
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  );
};

export default Page;
