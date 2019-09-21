import React from 'react';

export default function({ value, onChange }) {
  return (
    <>
    <span> Package: </span>
    <input type='text' value={value} onChange={onChange} />
    </>
  );
}
