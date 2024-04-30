import React from 'react';

function InputField(props) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={props.id} className="block text-gray-700 text-sm font-bold mb-2">{props.label}</label>
      <input type="text" 
      id={props.id} 
      value={props.value} 
      onChange={props.onChange} 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
  );
}

export default InputField;