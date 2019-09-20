import React from 'react';

export default function({ name, onChange }) {
  return (
    <div>
    <span> Package: </span>
    <input type='text' name={name} onChange={onChange} />
    </div>
  );
}
