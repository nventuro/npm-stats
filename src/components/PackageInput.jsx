import React from 'react';

export default function({ name, value, onChange }) {
  return (
    <>
    <span> Package: </span>
    <input type='text' name={name} value={value} onChange={onChange} />
    </>
  );
}
